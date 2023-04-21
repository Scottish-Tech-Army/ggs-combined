# GGS-combined README

## Deployment

Run the following command from the `ggs-combined` root directory: `./cdk/bin/install.sh`. You may need to `chmod +x` the script before you are able to run it. The script assumes that you have configured your AWS credentials inside your `~/.aws/credentials` file.

The installation script will install the GGS application to your AWS account.

The project uses [GitHub Actions](https://docs.github.com/en/actions). When changes are pushed to Github, Github actions are executed from the `.github/workflows` directory. What precisely is done depends upon which branch the changes are pushed to.

Changes to the `develop` branch are assumed to be intended for the `stage` deployment. They are deployed automatically to the stage environment on AWS. The stage environment is intended for testing prior to going into production.

Changes to the `main` branch are assumed to be intended for the `production` deployment. They are deployed automatically to the production environment on AWS. This will become the live web application used by end users.

Changes to all other branches are not deployed to AWS. These changes are built and then the unit tests are executed to ensure that the software is working as expected.

## Deployment Flow

Changes to the software should follow the following steps:

1. Develop your feature on a feature branch called something like `feat/some-feature` or perhaps use the name of the issue in jira;
2. When you are happy that the feature is ready for testing in a production like environment, merge your branch into the `develop` branch. The changes will now be deployed to AWS `stage` for testing;
3. When you are happy that the new feature works in `stage`, merge the changes into the `main` branch. This will be deployed into the production environment and may be used by end users.
