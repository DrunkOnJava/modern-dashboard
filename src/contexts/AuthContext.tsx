import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  isEmailVerified: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string, remember?: boolean) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { fullName?: string; avatar_url?: string }) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsEmailVerified(session?.user?.email_confirmed_at != null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsEmailVerified(session?.user?.email_confirmed_at != null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const resendVerificationEmail = async () => {
    if (!user?.email) throw new Error('No email address available');
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email
    });

    if (error) throw error;
  };
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      if (!email || !password || !fullName) {
        throw new Error('All fields are required');
      }

      // Validate inputs
      if (!email?.trim()) throw new Error('Email is required');
      if (!password?.trim()) throw new Error('Password is required');
      if (!fullName?.trim()) throw new Error('Full name is required');

      // Create user with profile data
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            updated_at: new Date().toISOString(),
            avatar_url: null
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        if (error.message?.toLowerCase().includes('already registered')) {
          throw new Error('An account with this email already exists');
        }
        throw new Error(error.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string, remember = false) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        persistSession: remember
      }
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const updateProfile = async (data: { fullName?: string; avatar_url?: string }) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: data.fullName,
        avatar_url: data.avatar_url
      }
    });

    if (error) throw error;
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setLoading(false);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isGuest,
    isEmailVerified,
    signUp,
    signIn,
    signInWithGoogle,
    continueAsGuest,
    signOut,
    resetPassword,
    updateProfile,
    resendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}