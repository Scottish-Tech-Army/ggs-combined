import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";

export class CdkBackendStack extends Stack {

  constructor(scope: Construct, id: string, env: string, props?: StackProps) {
    super(scope, id, props);

    const backendStackId = id;
    const envStageName = env;
    const resourcePrefix = "GGS-" + envStageName;

    // Common resources
    const stack = Stack.of(this);
    const region = stack.region;

    const LOCATION_PHOTOS_BUCKET_NAME =
      resourcePrefix.toLowerCase() + "-location-photos";
    const DISTRIBUTION_NAME = backendStackId + "-Distribution";

    const LOCATIONS_TABLE_NAME = resourcePrefix + "-Locations";
    const UNITS_TABLE_NAME = resourcePrefix + "-Units";

    /* S3 bucket for location photos
     *
     * Do not specify the bucket name in the bucket props. Let AWS 
     * assign a name. Specifying a bucket name in the props causes 
     * the "bucket name already exists" errors on deployment.
     * See: https://github.com/aws/aws-cdk/issues/16686
     * Same goes for all other resources.
     */
    const locationPhotosBucket = new Bucket(this, LOCATION_PHOTOS_BUCKET_NAME);

    new CfnOutput(this, "Location Photos bucket", {
      value: locationPhotosBucket.bucketName,
      description: "S3 bucket containing location photos",
    });

    // CloudFront distribution for location photos
    const locationPhotosDistribution = new cloudfront.Distribution(
      this,
      DISTRIBUTION_NAME,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(locationPhotosBucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    new CfnOutput(this, LOCATION_PHOTOS_BUCKET_NAME + " URL", {
      value: "https://" + locationPhotosDistribution.domainName,
      description:
        "External URL for " + LOCATION_PHOTOS_BUCKET_NAME + " website",
    });

    // Database tables for locations and units
    const locationsTable = new dynamodb.Table(this, LOCATIONS_TABLE_NAME, {
      partitionKey: { name: "locationId", type: dynamodb.AttributeType.STRING },
    });
    new CfnOutput(this, "Locations table", {
      value: locationsTable.tableName,
      description: "DynamoDB table containing locations",
    });

    const unitsTable = new dynamodb.Table(this, UNITS_TABLE_NAME, {
      partitionKey: { name: "unitId", type: dynamodb.AttributeType.STRING },
    });
    new CfnOutput(this, "Units table", {
      value: unitsTable.tableName,
      description: "DynamoDB table containing units",
    });

    // Lambda to process user API requests
    const ggsLambda = new NodejsFunction(this, "GGSLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: "../ggs-backend/resources/ggsLambda/index.ts",
      handler: "handler",
      environment: {
        REGION: region,
        LOCATIONS_TABLE_NAME: locationsTable.tableName,
        UNITS_TABLE_NAME: unitsTable.tableName,
      },
      timeout: Duration.seconds(30),
      bundling: {
        commandHooks: {
          beforeBundling(inputDir) {
            return [`cd ${inputDir} && npm install`];
          },
          afterBundling(inputDir: string, outputDir: string): string[] {
            // TODO: may need to cd back to where we started here...
            return [];
          },
          beforeInstall() {
            return [];
          },
        }
      },
    });

    locationsTable.grant(ggsLambda, "dynamodb:GetItem", "dynamodb:Scan");
    unitsTable.grant(
      ggsLambda,
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Scan"
    );

    // API gateway
    const restApi = new apigateway.LambdaRestApi(this, "GGSClientApi", {
      handler: ggsLambda,
      proxy: false,
      restApiName: "GGS Client Service (" + envStageName + ")",
      description: "This service provides the GGS app functions.",
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type", "ggsunit"],
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: envStageName,
      },
    });
    new CfnOutput(this, "GGS client API endpoint", {
      value: restApi.urlForPath(),
      description: "API Gateway endpoint for GGS API",
    });

    // API GET /locations
    const locationsApiResource = restApi.root.addResource("locations");
    locationsApiResource.addMethod("GET");

    const unitApiResource = restApi.root.addResource("unit");

    // API POST /unit/login
    const unitLoginApiResource = unitApiResource.addResource("login");
    unitLoginApiResource.addMethod("POST");

    // API POST /unit/register
    const unitRegisterApiResource = unitApiResource.addResource("register");
    unitRegisterApiResource.addMethod("POST");

    // API POST /unit/collect
    const unitCollectApiResource = unitApiResource.addResource("collect");
    unitCollectApiResource.addMethod("POST");

    // API GET /unit/leaderboard
    const unitLeaderboardApiResource = unitApiResource.addResource("leaderboard");
    unitLeaderboardApiResource.addMethod("GET");
  }
}
