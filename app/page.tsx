'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { updateUserClickCount, getUserClickCount } from '@/lib/firestore-utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogOut } from 'lucide-react';

export default function ClickCounterApp() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const [dbLoading, setDbLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load click count from Firestore when user logs in
  useEffect(() => {
    if (!loading && user) {
      loadClickCount();
    }
  }, [user, loading]);

  const loadClickCount = async () => {
    if (!user) return;
    try {
      setDbLoading(true);
      const count = await getUserClickCount(user);
      setClickCount(count);
    } catch (error) {
      console.error('Failed to load click count:', error);
    } finally {
      setDbLoading(false);
    }
  };

  const handleButtonClick = async () => {
    if (!user) return;
    
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Save to Firestore
    try {
      setIsSaving(true);
      await updateUserClickCount(user, newCount);
    } catch (error) {
      console.error('Failed to save click count:', error);
      // Revert on error
      setClickCount(clickCount);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!user) return;
    
    setClickCount(0);

    // Save reset to Firestore
    try {
      setIsSaving(true);
      await updateUserClickCount(user, 0);
    } catch (error) {
      console.error('Failed to save reset:', error);
      // Revert on error
      setClickCount(clickCount);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">Welcome</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to use the click counter. Please log in or create an account.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/login')}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/signup')}
              variant="outline"
              className="flex-1"
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center gap-4">
        <Link
          href="/manual"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Read Manual
        </Link>
        <div className="flex gap-2">
          <Link
            href="/settings"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Settings
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md p-8 md:p-12 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
            Click Counter
          </h1>
          <p className="text-center text-gray-600 text-sm mb-2">
            Click the button to count!
          </p>
          <p className="text-center text-xs text-gray-500">
            Logged in as: {user.email}
          </p>
        </div>

        {/* Display current count */}
        <div className="bg-indigo-50 rounded-lg p-8 mb-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Current Count:</p>
          {dbLoading ? (
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          ) : (
            <p className="text-6xl font-bold text-indigo-600">{clickCount}</p>
          )}
        </div>

        {/* Click button */}
        <Button
          onClick={handleButtonClick}
          disabled={isSaving || dbLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-16 text-lg font-bold mb-4"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Click Me! 🎯'
          )}
        </Button>

        {/* Reset button */}
        <Button
          onClick={handleReset}
          disabled={isSaving || dbLoading}
          variant="outline"
          className="w-full h-12"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Reset Counter ↻'
          )}
        </Button>

        {/* Motivational message */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            {clickCount === 0 && '👋 Click the button to start counting!'}
            {clickCount > 0 && clickCount < 5 && '🚀 You\'re getting started!'}
            {clickCount >= 5 && clickCount < 10 && '⭐ Great job! Keep clicking!'}
            {clickCount >= 10 && clickCount < 20 && '🔥 You\'re on a roll!'}
            {clickCount >= 20 && '🏆 Amazing! You\'re a clicking champion!'}
          </p>
        </div>
      </Card>
    </main>
  );
}
