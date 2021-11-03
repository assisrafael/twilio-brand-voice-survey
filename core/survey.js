"use strict";

const {
  getIntroductionMessage,
  getRequestMessage,
  getThankYouMessage,
  getRequestHints,
  getNegativeAnswerMessage,
  getPositiveAnswerMessage,
} = require("./messages");

const { CALLER_NAME, TWILIO_VOICE, BRAND_NAME, COUPON_CODE, COUPON_VALUE } =
  process.env;

const RESPONSE_OPTIONS = {
  voice: TWILIO_VOICE,
};

const SURVEY_ENDPOINT = "/survey-answer";

exports.isValidCustomer = function isValidCustomer({ phoneNumber, firstName }) {
  return (
    phoneNumber && phoneNumber.length > 10 && firstName && firstName.length > 2
  );
};

exports.getSurveyIntroductionTwiML = function getSurveyIntroductionTwiML({
  firstName,
}) {
  const response = new Twilio.twiml.VoiceResponse();

  response.say(
    RESPONSE_OPTIONS,
    getIntroductionMessage({
      firstName,
      callerName: CALLER_NAME,
      brandName: BRAND_NAME,
    })
  );

  const gather = response.gather({
    input: "speech",
    speechModel: "phoneCall",
    action: SURVEY_ENDPOINT,
    hints: getRequestHints(),
  });

  gather.say(RESPONSE_OPTIONS, getRequestMessage());
  //In case the customer doesn't answer the question
  response.say(
    RESPONSE_OPTIONS,
    getThankYouMessage({ couponCode: COUPON_CODE, couponValue: COUPON_VALUE })
  );

  return response.toString();
};

exports.getSurveyAnswerTwiML = function getSurveyAnswerTwiML(answer = "") {
  const response = new Twilio.twiml.VoiceResponse();

  if (answer.startsWith("no")) {
    response.say(
      RESPONSE_OPTIONS,
      getNegativeAnswerMessage({ brandName: BRAND_NAME })
    );
  } else if (answer.length > 2) {
    //yes or a brand name
    response.say(RESPONSE_OPTIONS, getPositiveAnswerMessage());
  } else {
    response.say(
      RESPONSE_OPTIONS,
      getThankYouMessage({ couponCode: COUPON_CODE, couponValue: COUPON_VALUE })
    );
  }

  return response.toString();
};
