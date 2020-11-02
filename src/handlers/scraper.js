const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const fetch = require('node-fetch');

/**
 * A Lambda function that logs the payload received from S3.
 */
exports.scraper = async (event, context) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const json = await response.json()
    try { // You should always catch your errors when using async/await
        const s3Response = await s3.putObject({

            Bucket: process.env.BUCKET,
            Key: "data.json",
            Body: JSON.stringify(json),
            ContentType: "application/json"

        }).promise();
        console.log("success")
    } catch (e) {
        console.log(e);
    }
    return "ok"
};
