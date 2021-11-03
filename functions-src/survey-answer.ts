`use strict`;

import { getSurveyAnswerTwiML } from "./core/survey";

export function handler (context, event, callback) {
  const answer = event.SpeechResult && event.SpeechResult.toLowerCase();

  const twiML = getSurveyAnswerTwiML(answer);

  callback(null, twiML);
};
