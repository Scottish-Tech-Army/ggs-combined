#!/bin/bash
# Install the GGS application to AWS using the Amazon CDK
#
# Script assumes it will be executed from root of repository like './cdk/bin/install.sh'

validate_env() {
    if [ -z $1 ]; then
        exit 1
    fi

    grep -F -q -x "$1" <<EOF
dev
test
prod
EOF
}

# Validate the environment to make sure it is a valid value
validate_env "$1"
if test "$?" != "0"; then
    echo "Invalid environment. Must be dev, test or prod"
    exit 1
fi

# exit script on error
set -o errexit

env="$1"
starting_dir=$(pwd)
backend_name="GGS-backend-${env}"
frontend_name="GGS-frontend-${env}"

if [ -z $2 ]; then
    export AWS_PROFILE=
else
    export AWS_PROFILE="$2"
fi

cd ./cdk

npm install

npm run build

cd ../ggs-backend

npm install

cd resources/ggsLambda

npm install

cd ../..

npm run build

cd resources/ggsLambda

# Run backend unit tests in non-interactive mode
npm test -- --watchAll=false

cd ../../../cdk

cdk bootstrap --context env=${env}

cdk deploy ${backend_name} --require-approval never --context env=${env} --outputs-file ../ggs-frontend/src/config.json

cd ../ggs-frontend

npm install

npm run build

# Run frontend unit tests in non-interactive mode
#npm test -- --watchAll=false

cd ../cdk

cdk deploy ${frontend_name} --require-approval never --context env=${env}

cd ${starting_dir}
