"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamodbClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
exports.dynamodbClient = new client_dynamodb_1.DynamoDBClient({
    region: process.env.REGION,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUEwRDtBQUU3QyxRQUFBLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUM7SUFDL0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtZHluYW1vZGJcIjtcblxuZXhwb3J0IGNvbnN0IGR5bmFtb2RiQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5SRUdJT04sXG59KTtcbiJdfQ==