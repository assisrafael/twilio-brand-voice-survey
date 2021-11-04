# twilio-brand-voice-survey

A simple landing page with a contact form that:

- should ask for first name and mobile phone number (both required)
- on submit should call an API endpoint that will trigger an outbound voice call to the customer

And an API that:

- should wait a given number of seconds (`CALL_DELAY`) before starting a phone call to a given customer
- should use Twilio Programmable Voice API (https://www.twilio.com/docs/voice)
- should implement an specific conversation template that will guide the phone call flow

## Tech Stack

- ReactJS and Bootstrap (CSS) for the landing page
- Twilio Serverless Functions for the API using nodejs
- Client side rendering only with assets served by Twilio Serverless Functions
