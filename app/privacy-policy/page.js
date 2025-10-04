"use client";
import React from 'react';
import Image from 'next/image';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Background Vector Image */}
      <div
        className="hidden lg:block absolute inset-0 w-full h-full opacity-10 sm:opacity-15 z-0"
        style={{
          backgroundImage: "url('/Vector.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '70% 80%',
        }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#C7A961] to-[#b8985a] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your privacy and trust are our top priorities. Learn how we protect and handle your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 space-y-12">
          
          {/* Introduction */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              At <strong>The Quiet Space Limited</strong>, your privacy and trust are our top priorities. This policy explains how we collect, use, and protect your information when you visit our website.
            </p>
          </section>

          {/* Your Consent */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Your Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you agree to the collection and use of your information as described in this Privacy Policy. If you do not agree, please do not use our website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect information to provide you with a secure, personalized, and seamless experience:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700">Name, email, phone number, and payment details you provide voluntarily.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700">Device type, browser, IP address, website usage, and cookies.</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Cookies</h4>
              <p className="text-gray-700">
                Small data files stored on your device to enhance your browsing experience, remember preferences, and simplify logins. You can disable cookies in your browser, but some website features may be limited.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-6">We use your information to:</p>
            <div className="space-y-4">
              {[
                "Process purchases and payments securely",
                "Communicate updates, offers, and relevant information",
                "Improve website functionality and user experience",
                "Respond to inquiries and provide customer support"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Accounts and Transactions */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Accounts and Transactions</h2>
            <p className="text-gray-700 leading-relaxed">
              Creating an account or making a purchase may require personal information. This information is used to provide services, deliver resources, and offer relevant content. Transaction details, such as payment information and billing addresses, are securely handled.
            </p>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>We never sell your personal information.</strong> We may share data with trusted service providers for website operations and payment processing, or when required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-6">You can:</p>
            <div className="space-y-3">
              {[
                "Access, update, or correct your personal information",
                "Request deletion of your data (subject to legal requirements)",
                "Opt-out of marketing communications"
              ].map((right, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">{right}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-gray-700">
                Contact us at <a href="mailto:contact@thequietspace.org" className="text-[#C7A961] font-medium hover:underline">contact@thequietspace.org</a> for any data-related requests.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement strict measures to protect your personal information from unauthorised access, alteration, or disclosure.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              Privacy laws may change. We may update this policy, and continued use of the website constitutes acceptance of these changes.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-[#C7A961] to-[#b8985a] p-8 rounded-3xl text-white text-center">
            <h2 className="text-3xl font-semibold mb-4 font-serif">Contact Us</h2>
            <p className="text-lg mb-6 text-white/90">
              For questions or concerns regarding this Privacy Policy, please email:
            </p>
            <a 
              href="mailto:contact@thequietspace.org" 
              className="inline-flex items-center px-6 py-3 bg-white text-[#C7A961] font-medium rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              contact@thequietspace.org
            </a>
          </section>


          {/* Last Updated */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
