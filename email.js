import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import sendMail from './libs/sendMail'
export async function main(event, context, callback) {
    let data = JSON.parse(event.body)

    sendMail(data.toAddress, data.subject, data.content)

    try {
        await dynamoDbLib.call("put", params);
        callback(null, success(params.Item));
    } catch (e) {
        // console.log(e)
        callback(null, failure({ status: false }));
    }
}