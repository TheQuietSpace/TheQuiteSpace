"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-sm max-w-360 mx-auto sticky top-4 z-50 m-0"
    >
      <div className="m-0 p-0">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-30 h-30 sm:w-72 sm:h-72 lg:w-70 lg:h-70">
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
                href="/retreat" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
                onClick={closeMobileMenu}
              >
                Retreat
              </Link>
              <Link 
                href="/workshop" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
              >
                Workshop
              </Link>
              <Link 
                href="/learning" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
              >
                Learning
              </Link>
              <Link 
                href="/about" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 font-sans text-sm sm:text-base font-semibold hover:text-amber-700 transition-colors duration-200 px-2 py-1"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center pr-2">
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
            }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white/95 border-t border-gray-100 rounded-b-3xl">
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
                href="/about" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 font-medium text-base rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;