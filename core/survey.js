"use strict";

const RESPONSE_OPTIONS = {
  voice: "alice",
};

exports.isValidCustomer = function isValidCustomer({ phoneNumber, firstName }) {
  return (
    phoneNumber && phoneNumber.length > 10 && firstName && firstName.length > 2
  );
};

exports.getSurveyIntroductionTwiML = function getSurveyIntroductionTwiML({
  firstName,
}) {
  const response = new Twilio.twiml.VoiceResponse();

  const welcomeMessage = `Welcome ${firstName}`;

  response.say(RESPONSE_OPTIONS, welcomeMessage);

  return response.toString();
};
