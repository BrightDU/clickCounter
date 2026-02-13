# Quick Start: Firebase Click Counter

Get your Firebase-powered click counter running in 10 minutes!

## Prerequisites

- A Google account (for Firebase)
- Basic knowledge of command line
- A code editor

## Step 1: Set Up Firebase Project (2 minutes)

1. **Create Firebase Project**
   - Go to https://firebase.google.com
   - Click "Get Started" → "Create a project"
   - Name it anything (e.g., "clickcounter-app")
   - Click through the setup (you can disable analytics)

2. **Create Web App**
   - In Firebase Console, click the Web icon (&lt;/&gt;)
   - Register your app
   - Copy the config object that appears

3. **Get Your Configuration**
   - Click Settings (gear icon) → Project Settings
   - Scroll to "Your apps"
   - Copy the config values:
     - `apiKey`
     - `authDomain`
     - `projectId`
     - `storageBucket`
     - `messagingSenderId`
     - `appId`

## Step 2: Configure Environment Variables (1 minute)

Add these to your Vercel project or `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=paste_your_apiKey_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paste_your_authDomain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paste_your_projectId_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paste_your_storageBucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste_your_messagingSenderId_here
NEXT_PUBLIC_FIREBASE_APP_ID=paste_your_appId_here
```

## Step 3: Enable Authentication (1 minute)

1. Go to Firebase Console
2. Click "Authentication" in the left menu
3. Click "Sign-in method"
4. Click "Email/Password"
5. Enable it and save

## Step 4: Set Firestore Rules (1 minute)

1. Go to Firebase Console
2. Click "Firestore Database"
3. Click the "Rules" tab
4. Replace everything with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

5. Click "Publish"

## Step 5: Install Dependencies (1 minute)

```bash
npm install
# or
pnpm install
# or
yarn install
```

## Step 6: Run the App (1 minute)

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 7: Test It! (2 minutes)

1. Click "Sign Up"
2. Enter an email and password (must be 6+ characters)
3. Click "Sign Up"
4. You should be taken to the click counter page
5. Click the "Click Me!" button - it saves automatically to Firestore!
6. Refresh the page - your count is still there!
7. Click "Logout"
8. Click "Login" with the same email/password
9. Your click count is still saved!

## Troubleshooting

**"Firebase is not defined"**
- Run `npm install firebase`

**"Permission Denied"**
- Did you publish the Firestore rules?
- Is your Firebase config correct?

**"User Not Found"**
- Did you enable Email/Password authentication?
- Check your Firebase project is set up correctly

**"Can't connect to Firebase"**
- Check your environment variables are copied exactly
- No extra spaces!

## Next Steps

- Add a password reset feature
- Create a leaderboard showing top clickers
- Add user profile pages
- Deploy to Vercel!

## File Structure

```
lib/
├── firebase.ts           # Firebase setup
├── auth-context.tsx      # Login/logout
└── firestore-utils.ts    # Database operations

app/
├── page.tsx              # Click counter (main page)
├── login/page.tsx        # Login form
├── signup/page.tsx       # Signup form
└── manual/page.tsx       # Full documentation
```

## Learn More

- Click "Read Manual" in the app for detailed explanations
- Read `FIREBASE_INTEGRATION.md` for advanced topics
- Check the code comments for inline explanations

## Getting Help

1. Check the manual in the app (click "Read Manual")
2. Look at the code comments
3. Read error messages carefully
4. Check [Firebase Docs](https://firebase.google.com/docs)
5. Check [Next.js Docs](https://nextjs.org/docs)

Good luck! 🎉
