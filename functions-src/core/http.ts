import '@twilio-labs/serverless-runtime-types';

export function createBadResponse(error) {
  return createResponse(400, error.message);
}

export function createUnauthorizedResponse() {
  return createResponse(401, "unauthorized");
}

function createResponse(status, message) {
  const response = new Twilio.Response();

  response.setStatusCode(status);
  response.setBody(message);

  return response;
}

export function hasValidCredentials(event) {
  return (
    process.env.PAGE_TOKEN &&
    event.pageToken &&
    event.pageToken === process.env.PAGE_TOKEN
  );
}
