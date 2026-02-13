# Firebase Integration Guide

This document explains how Firebase authentication and Firestore are integrated into this Click Counter app.

## Overview

This app uses:
- **Firebase Authentication** - User signup, login, and logout
- **Firestore Database** - Store user click counts persistently
- **Next.js App Router** - Frontend framework
- **React Context** - State management for user session

## Project Structure

```
lib/
├── firebase.ts              # Firebase initialization
├── auth-context.tsx         # Authentication context & hooks
└── firestore-utils.ts       # Firestore database operations

app/
├── page.tsx                 # Main click counter (protected)
├── login/page.tsx           # Login page
├── signup/page.tsx          # Signup page
└── layout.tsx               # Root layout with AuthProvider
```

## Quick Start

### 1. Set Up Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Get Started" → Create a new project
3. Name it (e.g., "my-clickcounter-app")
4. Complete the setup wizard

### 2. Get Your Firebase Config

1. In Firebase Console, click Settings (gear icon)
2. Click "Project Settings"
3. Scroll to "Your apps" section
4. Click the Web app icon (&lt;/&gt;)
5. Copy the entire config object

### 3. Add Environment Variables

Add these to your Vercel project (Settings → Environment Variables):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Set Up Firestore Security Rules

1. Go to Firebase Console → Firestore Database
2. Click the "Rules" tab
3. Replace all content with:

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

4. Click "Publish"

### 5. Enable Authentication Methods

1. Go to Firebase Console → Authentication
2. Click "Sign-in method"
3. Enable "Email/Password"
4. Save

## How It Works

### Authentication Flow

1. **User Signs Up** (signup/page.tsx)
   - User enters email and password
   - `signup()` creates a new Firebase user
   - User is automatically logged in

2. **User Logs In** (login/page.tsx)
   - User enters email and password
   - `login()` authenticates with Firebase
   - Session is stored by Firebase SDK

3. **Session Persistence** (auth-context.tsx)
   - `onAuthStateChanged()` watches for login/logout
   - `useAuth()` hook provides user info to components

### Data Persistence

1. **User Clicks Button** (app/page.tsx)
   - Click count increases in state
   - `updateUserClickCount()` saves to Firestore immediately

2. **Loading Persisted Data** (app/page.tsx)
   - When user logs in, `getUserClickCount()` loads their count
   - Loaded from `users/{userId}` document in Firestore

## Key Components

### 1. Firebase Configuration (`lib/firebase.ts`)

Initializes Firebase with your config:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 2. Auth Context (`lib/auth-context.tsx`)

Provides user session management:

```typescript
export function useAuth() {
  return {
    user,        // Current logged-in user
    loading,     // Auth state loading
    signup,      // Create new account
    login,       // Sign in
    logout,      // Sign out
  };
}
```

### 3. Firestore Utilities (`lib/firestore-utils.ts`)

Database operations:

```typescript
// Save click count
updateUserClickCount(user, clickCount)

// Load click count
getUserClickCount(user)

// Get all users (for leaderboard)
getAllUserClickCounts()
```

## Common Tasks

### Redirect Unauthenticated Users

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (!user) return <div>Loading...</div>;

  return <div>Protected content</div>;
}
```

### Save Data to Firestore

```typescript
import { updateUserClickCount } from '@/lib/firestore-utils';

const newClickCount = clickCount + 1;
await updateUserClickCount(user, newClickCount);
```

### Load Data from Firestore

```typescript
import { getUserClickCount } from '@/lib/firestore-utils';

useEffect(() => {
  if (user) {
    const count = await getUserClickCount(user);
    setClickCount(count);
  }
}, [user]);
```

## Troubleshooting

### Error: "Firebase is not defined"
- Install Firebase: `npm install firebase`
- Check your imports are correct

### Error: "Auth/User Not Found"
- Verify Firebase config is correct
- Check Firebase project has Authentication enabled
- Ensure user created an account in Firebase Console

### Error: "Permission Denied"
- Check Firestore Security Rules are published
- Verify user is logged in (authenticated)
- Check user ID matches in rules

### Error: "config has invalid values"
- Double-check all env vars in Vercel project settings
- Copy them directly from Firebase Console
- Make sure no extra spaces

### Data not saving
- Check user is logged in (not null)
- Check Firestore Security Rules allow write access
- Check browser console for errors
- Verify Firestore database exists in Firebase Console

## Security Best Practices

1. **Never expose private keys** - Use NEXT_PUBLIC_ prefix only for public keys
2. **Set up Security Rules** - Restrict data access as shown above
3. **Validate on server** - Use API routes if you need backend validation
4. **Use HTTPS only** - Firebase enforces this automatically
5. **Update passwords** - Allow users to change passwords regularly

## Expanding the App

### Add User Profiles
```typescript
// Save user data in Firestore
{
  userId: "user123",
  email: "user@example.com",
  displayName: "John Doe",
  avatar: "url",
  createdAt: timestamp
}
```

### Add Leaderboard
```typescript
import { getAllUserClickCounts } from '@/lib/firestore-utils';

const topUsers = await getAllUserClickCounts();
```

### Add Real-time Updates
```typescript
import { onSnapshot } from 'firebase/firestore';

// Listen for real-time updates
const unsubscribe = onSnapshot(userDocRef, (doc) => {
  setClickCount(doc.data().clickCount);
});
```

## Firebase Console Links

- [Firebase Console](https://console.firebase.google.com)
- [Authentication](https://console.firebase.google.com/authentication)
- [Firestore Database](https://console.firebase.google.com/firestore)
- [Firebase Documentation](https://firebase.google.com/docs)

## Resources

- [Firebase Web SDK Documentation](https://firebase.google.com/docs/web/setup)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Review Firebase Console logs
3. Check browser console (F12) for errors
4. Read the manual in the app (Read Manual button)
5. Visit [Firebase Documentation](https://firebase.google.com/docs)
