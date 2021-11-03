export function getIntroductionMessage({ firstName, callerName, brandName }) {
  return `Hi ${firstName} - This is ${callerName} from ${brandName}. Thanks for visiting our site today.
    We’d love to offer you a first time customer discount in exchange for your honest feedback to a one-question survey.`;
}

export function getRequestMessage() {
  return `Since visiting our site, have you purchased a renovation service from another company or pro? (If No, say “No”, If Yes, say the name of the company you purchased from)`;
}

export function getRequestHints() {
  return "yes, no, name";
}

export function getThankYouMessage({ couponCode, couponValue }) {
  return `Thanks for your response. Use code ${couponCode} at checkout to get ${couponValue} off if you decide to book with Cube in the future.`;
}

export function getNegativeAnswerMessage({ brandName }) {
  return `${brandName} provides beautiful, architect-designed renovations completed reliably from start to end.
    We are offering $2,000 off your bath renovation if you stay on the line to speak to a member of our concierge team who can provide you with a free quote.`;
}
export function getPositiveAnswerMessage() {
  return `We’re sorry to lose your business, and we hope you enjoy your new bathroom.`;
}
