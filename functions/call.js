"use strict";

const {
  createBadResponse,
  createUnauthorizedResponse,
  hasValidCredentials,
} = require("../core/http");
const {
  isValidCustomer,
  getSurveyIntroductionTwiML,
} = require("../core/survey");

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

  if (!event.customer || !isValidCustomer(event.customer)) {
    return Promise.reject(new Error("Invalid customer"));
  }

  const { phoneNumber, firstName } = event.customer;

  return client.calls.create({
    twiml: getSurveyIntroductionTwiML({ firstName }),
    to: phoneNumber,
    from: FROM_PHONE_NUMBER,
  });
}
