// Firebase configuration and initialization
// This file sets up Firebase for use throughout the app

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  connectAuthEmulator,
  Auth 
} from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator,
  Firestore 
} from 'firebase/firestore';

// Firebase configuration using environment variables
// These variables are set in your Vercel project settings
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// This creates a connection to your Firebase project
let app;
let auth: Auth;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Optional: Connect to Firebase Emulator Suite for local development
  // Uncomment these lines if you're running the Firebase emulator locally
  // if (process.env.NODE_ENV === 'development') {
  //   try {
  //     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  //     connectFirestoreEmulator(db, 'localhost', 8080);
  //   } catch (error) {
  //     console.error('Error connecting to emulators:', error);
  //   }
  // }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
}

export { auth, db };
