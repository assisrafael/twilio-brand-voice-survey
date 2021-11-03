`use strict`;

const { getSurveyAnswerTwiML } = require("../core/survey");

exports.handler = function (context, event, callback) {
  const answer = event.SpeechResult && event.SpeechResult.toLowerCase();

  const twiML = getSurveyAnswerTwiML(answer);

  callback(null, twiML);
};
