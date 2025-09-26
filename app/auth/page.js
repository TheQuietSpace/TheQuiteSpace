'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabse';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check for user session and handle OAuth callback
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        router.push('/'); // Redirect to home if logged in
      }
    };
    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        router.push('/');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [router]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
    });
    if (error) {
      console.error('Auth error:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-[--font-poppins] text-gray-900">Welcome to The Quiet Space</h1>
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center font-[--font-poppins] font-semibold"
        >
          {loading ? 'Processing...' : (
            <>
              <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.8 0 6.4 1.6 7.9 3l5.8-5.8C33.9 3.1 29.3 1 24 1 14.6 1 7.2 7.3 5.7 15.1l7.4 5.7c1.8-5.3 6.6-9.8 11.9-9.8z"
                />
                <path
                  fill="#34A853"
                  d="M24 27c-3.3 0-6-2.2-7.1-5.2l-7.4 5.7c2.3 4.4 6.7 7.5 12.5 7.5 3.7 0 6.9-1.3 9.4-3.5l-7.3-5.6c-1.2.7-2.7 1.1-4.1 1.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M44 24c0-1.3-.1-2.6-.4-3.9H24v7.9h11.1c-.5 2.5-2 4.6-4.1 5.6l7.3 5.6c4.2-3.9 6.7-9.7 6.7-15.2z"
                />
                <path
                  fill="#EA4335"
                  d="M12.1 15.1l-7.4-5.7C2.2 13.2 1 18.4 1 24s1.2 10.8 3.7 14.6l7.4-5.7c-1.1-3-1.1-6.3 0-9.3z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}