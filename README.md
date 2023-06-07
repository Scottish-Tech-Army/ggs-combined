# GGS-combined README

This repository contains the source code for the Girlguiding Scotland Treasure Hunting web application.

## Deployment

During development when you are working on features of the application locally, run the following command from the `ggs-combined` root directory: `./cdk/bin/install.sh`. You may need to `chmod +x` the script before you are able to run it. The script assumes that you have configured your AWS credentials inside your `~/.aws/credentials` file.

The `./cdk/bin/install.sh` script takes two arguments. The first is the environment you wish to deploy. The second is the AWS profile you wish to use. The second argument is optional. If you don't provide a profile, the script assumes you mean to deploy using your `default` profile in `~/.aws/credentials` file.

For instance, the following will deploy the `dev` environment to the default AWS profile: `./cdk/bin/install.sh dev`. The following command will deploy the `dev` environment to the `sta` AWS profile: `./cdk/bin/install.sh dev sta`.

The installation script will install the GGS application to your AWS account.

The project uses [GitHub Actions](https://docs.github.com/en/actions). When changes are pushed to Github, Github actions are executed from the `.github/workflows` directory. What precisely is done depends upon which branch the changes are pushed to.

Changes to the `develop` branch are assumed to be intended for the `stage` deployment. They are deployed automatically to the stage environment on AWS. The stage environment is intended for testing prior to going into production.

Changes to the `main` branch are assumed to be intended for the `production` deployment. They are deployed automatically to the production environment on AWS. This will become the live web application used by end users.

Changes to all other branches are not deployed to AWS. These changes are built and then the unit tests are executed to ensure that the software is working as expected.

Both the `production` and `stage` deployments are made to AWS. The Scottish Tech Army has an AWS account, and both environments are deployed automatically to the STA AWS account. The GGS-combined repository has two Github environments, one for `stage` and another for `production`. The github environments contain secrets relating to the AWS credentials needed to deploy to AWS.

Under **no** circumstances must the AWS secrets be added plain text to the source code in this repository.

Please note that the deployment keys used to communicate with AWS are temporary and need periodic updating from the STA AWS account. Ideally this should not be necessary but at this point the solution to creating temporary AWS access keys during Github Actions deployment is unknown.

## Deployment Flow

Changes to the software should follow the following steps:

1. Develop your feature on a feature branch called something like `feat/some-feature` or perhaps use the name of the issue in jira;
2. When you are happy that the feature is ready for testing in a production like environment, merge your branch into the `develop` branch. The changes will now be deployed to AWS `stage` for testing;
3. When you are happy that the new feature works in `stage`, merge the changes into the `main` branch. This will be deployed into the production environment and may be used by end users.

## Backend

The backend is an AWS Lambda serverless RESTful API written in Typescript. For more details, please see [backend README](ggs-backend/README.md).

## Frontend

The frontend is a React web application written in Javascript. For more details, please see [frontend README](ggs-frontend/README.md).
