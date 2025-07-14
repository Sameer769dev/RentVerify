
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, accessToken: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string| null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);

        // Check for redirect result to get credential
        const credential = await getRedirectResult(auth).then(result => {
            if (result) {
              return GoogleAuthProvider.credentialFromResult(result);
            }
            return null;
        }).catch(() => null);

        if (credential?.accessToken) {
             setAccessToken(credential.accessToken);
        } else {
             // Fallback for subsequent loads, might need a more robust solution
             // to refresh or retrieve the token. For this POC, we'll see if it persists.
             const storedToken = sessionStorage.getItem('gdrive_token');
             if(storedToken) setAccessToken(storedToken);
        }

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
            setUserProfile(null); // Or handle case where profile doesn't exist yet
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setAccessToken(null);
        sessionStorage.removeItem('gdrive_token');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, accessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
