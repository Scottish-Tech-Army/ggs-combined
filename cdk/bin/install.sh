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

env="$1"
starting_dir=$(pwd)
backend_name="GGS-backend-${env}"
frontend_name="GGS-frontend-${env}"

cd ./cdk

npm install

npm run build

cd ../ggs-backend

npm install

cd resources/ggsLambda

npm install

cd ../..

#cd utils

#npm install

#cd ..

npm run build

cd ../cdk

cdk bootstrap --context env=${env}

cdk deploy ${backend_name} --require-approval never --context env=${env} --outputs-file ../ggs-frontend/src/config.json

cd ../ggs-frontend

npm install

npm run build

npm test

cd ../cdk

cdk deploy ${frontend_name} --require-approval never --context env=${env}

cd ${starting_dir}
