// Firestore utilities - functions for reading/writing user click counts
// This file contains all database operations

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

// Type definition for user click data
export interface UserClickData {
  userId: string;
  clickCount: number;
  email: string;
  lastUpdated: Timestamp;
  createdAt: Timestamp;
}

/**
 * Create or update a user's click counter in Firestore
 * @param user - The Firebase user object
 * @param clickCount - The new click count
 */
export async function updateUserClickCount(
  user: User,
  clickCount: number
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // User document exists, update the click count
      await updateDoc(userDocRef, {
        clickCount,
        lastUpdated: Timestamp.now(),
      });
    } else {
      // First time user, create a new document
      await setDoc(userDocRef, {
        userId: user.uid,
        clickCount,
        email: user.email,
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error updating click count:', error);
    throw error;
  }
}

/**
 * Get a user's current click count from Firestore
 * @param user - The Firebase user object
 * @returns The user's click count or 0 if not found
 */
export async function getUserClickCount(user: User): Promise<number> {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().clickCount || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching click count:', error);
    throw error;
  }
}

/**
 * Get all users' click counts (for leaderboard)
 * Useful for showing top clickers
 */
export async function getAllUserClickCounts(): Promise<UserClickData[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users: UserClickData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserClickData);
    });

    // Sort by click count in descending order
    return users.sort((a, b) => b.clickCount - a.clickCount);
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

/**
 * Delete a user's data when they delete their account
 * @param userId - The Firebase user ID
 */
export async function deleteUserData(userId: string): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {}, { merge: false });
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}
