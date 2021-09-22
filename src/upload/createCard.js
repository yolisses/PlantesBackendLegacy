import { lambda } from '../vendor/lambda.js';

export async function createCard(key) {
  const payload = JSON.stringify({ key });
  await lambda.invoke({
    FunctionName: process.env.CREATE_CARD_LAMBDA_FUNCTION,
    Payload: payload,
  }, (err) => console.error(err)).promise();
}
