"use strict";

const RESPONSE_OPTIONS = {
  voice: "alice",
};
const FROM_PHONE_NUMBER = process.env.FROM_PHONE_NUMBER;

exports.handler = function (context, event, callback) {
  if (!hasValidCredentials(event)) {
    return callback(null, createUnauthorizedResponse());
  }

  triggerSurveyCall(context, event).then(
    (call) => callback(null, call.sid),
    (error) => callback(null, createBadResponse(error))
  );
};

function triggerSurveyCall(context, event) {
  const client = context.getTwilioClient();

  if (!isValidCustomer(event.customer)) {
    return Promise.reject(new Error("Invalid customer"));
  }

  const { phoneNumber, firstName } = event.customer;

  return client.calls.create({
    twiml: getSurveyIntroductionTwiML({ firstName }),
    to: phoneNumber,
    from: FROM_PHONE_NUMBER,
  });
}

function isValidCustomer({ phoneNumber, firstName }) {
  return (
    phoneNumber && phoneNumber.length > 10 && firstName && firstName.length > 2
  );
}

function getSurveyIntroductionTwiML({ firstName }) {
  const response = new Twilio.twiml.VoiceResponse();

  const welcomeMessage = `Welcome ${firstName}`;

  response.say(RESPONSE_OPTIONS, welcomeMessage);

  return response.toString();
}

function createBadResponse(error) {
  const response = new Twilio.Response();

  response.setStatusCode(400);
  response.setBody(error.message);

  return response;
}

function createUnauthorizedResponse() {
  const response = new Twilio.Response();

  response.setStatusCode(401);
  response.setBody("unauthorized");

  return response;
}

function hasValidCredentials(event) {
  return (
    process.env.PAGE_TOKEN &&
    event.pageToken &&
    event.pageToken === process.env.PAGE_TOKEN
  );
}
