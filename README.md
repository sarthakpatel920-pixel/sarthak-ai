# SARTHAK AI — public website starter

This is a starter project for a ChatGPT-style study assistant website. It works on mobile browsers and desktop browsers.

## What is included
- Clean, ChatGPT-inspired interface
- Study prompt buttons
- Hindi/Hinglish-friendly assistant instructions
- Server-side AI API integration (the secret API key is not exposed to visitors)
- Demo response when no API key has been configured

## Run locally
1. Install Node.js 18 or newer on a computer.
2. Unzip this project and open a terminal in the project folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and add your own API key.
5. Run `npm start`.
6. Open `http://localhost:3000`.

## Make it public
Deploy the project to a Node.js hosting provider that supports environment variables. Set the environment variable `OPENAI_API_KEY` in the host dashboard, then deploy. The host will give you a public website link.

## Important
- Do not share your API key or upload `.env` to GitHub.
- API usage may cost money. Set usage limits/budget alerts with the provider.
- Without an API key, the site is only in demo mode and will not generate real AI answers.
- Before sharing widely, add rate limiting, abuse protection, a privacy notice, and age-appropriate moderation. Public visitors can use up your API budget if these protections are missing.
- This starter does not yet support image uploads or voice chat; those can be added as a next step.
