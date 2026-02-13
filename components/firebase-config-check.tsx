'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function FirebaseConfigCheck() {
  const [isConfigured, setIsConfigured] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is properly configured
    const requiredVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID',
      
    ];

    const allConfigured = requiredVars.every(
      (varName) => process.env[varName as keyof typeof process.env]
    );

    // setIsConfigured(allConfigured);
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!isConfigured) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-600">
              Firebase Not Configured
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Your Firebase environment variables are not set up. To use this app, you need to:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-6">
            <li>Create a Firebase project at firebase.google.com</li>
            <li>Get your Firebase config from the project settings</li>
            <li>
              Add these environment variables in the{' '}
              <strong>"Vars"</strong> section of your project sidebar:
              <ul className="mt-2 ml-4 space-y-1 font-mono text-xs bg-gray-100 p-2 rounded">
                <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
              </ul>
            </li>
            <li>Refresh this page after adding the variables</li>
          </ol>
          <p className="text-xs text-gray-500">
            See the QUICK_START.md or SETUP_CHECKLIST.md files in the project root for detailed
            instructions.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
