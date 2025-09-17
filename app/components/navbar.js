"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white backdrop-blur-sm border sticky top-0 z-50 border-gray-200 rounded-3xl mt-10 shadow-sm max-w-360 mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center ">
              {/* Logo Image - Replace with your actual logo */}
              <div className="w-60 h-60 relative sm:w-75 sm:h-75">
                <Image
                  src="/logo.svg" // Replace with your actual logo path
                  alt="The Quiet Space Logo"
                  fill
                  className="object-contain"
                />
              </div>
              
             
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex  justify-end-safe mr-4 flex-grow space-x-16">
            <Link 
              href="/retreat" 
              className="text-gray-900  font-sans font-bold hover:text-amber-700 transition-colors duration-200"
            >
              Retreat
            </Link>
            <Link 
              href="/workshop" 
              className="text-gray-900 font-sans font-bold hover:text-amber-700 transition-colors duration-200"
            >
              Workshop
            </Link>
            <Link 
              href="/learning" 
              className="text-gray-900 font-sans  font-bold hover:text-amber-700 transition-colors duration-200"
            >
              Learning
            </Link>
            <Link 
              href="/about" 
              className="text-gray-900 font-sans text-base font-bold hover:text-amber-700 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-900 font-sans font-bold hover:text-amber-700 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-amber-700 focus:outline-none focus:text-amber-700"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            <Link 
              href="/retreat" 
              className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Retreat
            </Link>
            <Link 
              href="/workshop" 
              className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Workshop
            </Link>
            <Link 
              href="/learning" 
              className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Learning
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;