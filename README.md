# Fixwell app (iPhone + Android)

One React Native codebase (Expo SDK 58, Expo Router, TypeScript) for both platforms.
Matches the Fixwell website and the phone screens on the design canvas.

## Screens

Homeowner app (tabs: Home, Requests, Account)
- `src/app/(homeowner)/index.tsx`: pick a job type, see your active request
- `src/app/request/[service].tsx`: new request form (description, photos, ZIP, when, phone, consent text)
- `src/app/matched/[id].tsx`: your matched pro, with Call and Text
- `src/app/(homeowner)/requests.tsx`: active and past requests

Pro app (tabs: Leads, Balance, Settings)
- `src/app/(pro)/leads.tsx`: new and earlier leads, on/off switch for receiving leads
- `src/app/lead/[id].tsx`: lead detail, Call homeowner, outcome, request a credit
- `src/app/(pro)/balance.tsx`: balance, add funds, weekly budget, activity

The Account and Settings tabs have a demo button to switch between the two apps.
In production, the pro app would open after signing in with a pro account.

## Run it

1. Install Node.js 20 or newer.
2. In this folder: `npm install`
3. `npx expo start`
4. Install **Expo Go** on your phone and scan the QR code (iPhone: Camera app; Android: Expo Go).

`npm run web` opens it in a browser. `npm run typecheck` checks the code.

## What to connect next

All data is sample data in `src/store.tsx`. Bracketed text like `[PRO NAME]`, `[ZIP]` and `[$35]` are placeholders.

- Backend: replace the functions in `src/store.tsx` with calls to your API (create request, match pro, list leads, credits, balance).
- Sign-in: homeowners by phone code, pros by phone or email.
- Phone numbers: `PRO_PHONE` and `HOMEOWNER_PHONE` should be masked/tracked numbers from your call-tracking provider (this is also how live-call billing and the 60-second rule get measured).
- Payments: "Add funds" should open your payment provider's native checkout.
- Photos: add `expo-image-picker` to the "Add photos" button.
- Push alerts for new leads: `expo-notifications`.

## Publish to the App Store and Google Play

Use EAS Build (no Mac needed): `npx eas-cli@latest build -p all`, then `npx eas-cli@latest submit`.
You need an Apple Developer account and a Google Play Console account.
Bundle ID / package name is `com.fixwell.app` in `app.json`; change it to your own domain before the first build.
