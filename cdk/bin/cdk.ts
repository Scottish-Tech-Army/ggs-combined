#!/usr/bin/env node

import { App, Tags } from "aws-cdk-lib";
import { CdkFrontendStack } from "../lib/CdkFrontendStack";
import { CdkBackendStack } from "../lib/CdkBackendStack";

const app = new App();
const envStageName = app.node.tryGetContext("env");

if (!envStageName) {
  throw new Error(
    `run with parameters:
  --context env=ENVIRONMENT_NAME (i.e. dev, test, live, etc.)`
  );
}

new CdkFrontendStack(app, `GGS-frontend-${envStageName}`, envStageName);
new CdkBackendStack(app, `GGS-backend-${envStageName}`, envStageName);

Tags.of(app).add("DeployEnvironment", envStageName);
