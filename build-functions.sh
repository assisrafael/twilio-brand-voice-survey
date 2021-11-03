#!/bin/bash
npx esbuild functions-src/call.ts --bundle --outfile=functions/call.js --platform=node --target=node12
npx esbuild functions-src/survey-answer.ts --bundle --outfile=functions/survey-answer.js --platform=node --target=node12