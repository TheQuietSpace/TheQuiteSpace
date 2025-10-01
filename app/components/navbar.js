"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabse";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user and handle auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

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
    router.push("/signup");
    closeMobileMenu();
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm w-[calc(100%-16px)] sm:w-[calc(100%-32px)] max-w-7xl mx-auto fixed top-2 z-50 left-1/2 transform -translate-x-1/2"
    >
      <div className="m-0 p-0 w-full">
        <div className="px-3 sm:px-6 w-full">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 w-full">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link
                href="/"
                className="flex items-center"
                onClick={closeMobileMenu}
              >
                <div className="relative w-32 h-8 xs:w-36 xs:h-9 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-66 lg:h-34">
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
            <div className="hidden lg:flex items-center justify-end flex-grow space-x-4 xl:space-x-6 pr-2 xl:pr-4">
              <Link
                href="/about"
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link
                href="/retreat"
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Retreats
              </Link>
              <Link
                href="/workshop"
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Workshop
              </Link>
              <Link
                href="/learning"
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Membership
              </Link>
              <Link
                href="/yoga-teacher-training"
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Yoga Training
              </Link>
              <Link
                href="/contact" 
                className="text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || "User"}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-[#C1A050] p-1 rounded-md"
                    aria-label="Sign out"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center text-gray-900 font-sans text-sm xl:text-base font-semibold hover:text-[#C1A050] transition-colors duration-200 px-1 xl:px-2 py-1 whitespace-nowrap"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 hover:text-[#C1A050] focus:outline-none focus:text-[#C1A050] focus:ring-2 focus:ring-[#C1A050] focus:ring-offset-2 rounded-md"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  // Close (X) icon
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            } w-full`}
          >
            <div className="px-2 pt-2 mt-4 sm:mt-6 pb-4 space-y-1 bg-white/95 border-t border-gray-100 rounded-b-2xl sm:rounded-b-3xl w-full">
              <Link
                href="/about"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/retreat"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                Retreat
              </Link>
              <Link
                href="/workshop"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                Workshop
              </Link>
              <Link
                href="/learning"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                Learning
              </Link>
              <Link
                href="/yoga-teacher-training"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                Yoga Training
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <div className="flex items-center justify-center px-3 py-2.5 sm:py-3">
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || "User"}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-center px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/signup"
                  className="block px-3 py-2.5 sm:py-3 text-gray-700 hover:text-[#C1A050] hover:bg-[#C1A050]/10 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200 text-center"
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