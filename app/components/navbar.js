'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabse';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user and handle auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth');
    closeMobileMenu();
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-sm w-full max-w-360 md:mx-auto mx-2 sticky top-2 z-50"
    >
      <div className="m-0 p-0 w-full">
        <div className="px-2 sm:px-6 w-full">
          <div className="flex justify-between items-center h-16 sm:h-20 w-full">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-44 h-42 sm:w-36 sm:h-16 md:w-48 md:h-30 lg:w-66 lg:h-34">
                  <Image
                    src="/logo.svg"
                    alt="The Quiet Space Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center justify-end flex-grow space-x-6 pr-4">
              <Link 
                href="/about" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/retreat" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                Retreat
              </Link>
              <Link 
                href="/workshop" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                Workshop
              </Link>
              <Link 
                href="/learning" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                Learning
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-gray-900 font-sans text-sm sm:text-base font-semibold">
                    {user.user_metadata.full_name || 'User'}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-amber-700 p-1 rounded-md"
                    aria-label="Sign out"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link 
                  href="/auth" 
                  className="flex items-center text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center  pr-2">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 hover:text-amber-700 focus:outline-none focus:text-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  // Close (X) icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0 overflow-hidden'
            } w-full`}
          >
            <div className="px-2 pt-2 mt-6 pb-4 space-y-1 bg-white/95 border-t border-gray-100 rounded-b-3xl w-full">
              <Link 
                href="/about" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/retreat" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Retreat
              </Link>
              <Link 
                href="/workshop" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Workshop
              </Link>
              <Link 
                href="/learning" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Learning
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <div className="flex items-center px-3 py-3 text-gray-700 font-medium text-base">
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>{user.user_metadata.full_name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth" 
                  className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;