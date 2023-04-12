import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class CdkFrontendStack extends Stack {

  constructor(scope: Construct, id: string, env: string, props?: StackProps) {
    super(scope, id, props);

    const frontendStackId = id;

    // S3 has a global name restriction per region.
    // If someone grabs the default bucket name, change it here.
    const BUCKET_NAME = frontendStackId;
    const DISTRIBUTION_NAME = frontendStackId + "-Distribution";
    const DEPLOY_NAME = frontendStackId + "-DeployWithInvalidation";

    // S3 bucket to host web client files
    const bucket = new Bucket(this, BUCKET_NAME);

    // CloudFront distribution for website
    const distribution = new cloudfront.Distribution(
      this,
      DISTRIBUTION_NAME,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    new s3deploy.BucketDeployment(this, DEPLOY_NAME, {
      sources: [s3deploy.Source.asset("../ggs-frontend/build")],
      destinationBucket: bucket,
      distribution,
    });

    new CfnOutput(this, frontendStackId + " URL", {
      value: "https://" + distribution.domainName,
      description: "External URL for " + frontendStackId + " website",
    });
  }
}
