// Authentication context - manages user state across the app
// This allows any component to access the current user without prop drilling

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  type User,
  type AuthError,
} from 'firebase/auth';
import { auth } from './firebase';

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set up Firebase auth listener on mount
  useEffect(() => {
    // onAuthStateChanged monitors login/logout state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the listener when component unmounts
    return unsubscribe;
  }, []);

  // Sign up function
  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      // Create a new user account
      await createUserWithEmailAndPassword(auth, email, password);
      // User is automatically logged in after signup
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      // Sign in existing user
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      throw error;
    }
  };

  // Change password function
  const changePassword = async (newPassword: string) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      // Update the password for the current user
      await updatePassword(user, newPassword);
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
// Use this in any component to access user and auth functions
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
