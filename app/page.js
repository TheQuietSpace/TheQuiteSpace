"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import RetreatsSection from './components/RetreatsSection';

import Link from 'next/link';

const HeroSection = () => {
  const services = [
    {
      id: 'retreats',
      title: 'Retreats',
      image: '/interior-design-yoga-space.jpg', // Replace with your actual image path
      alt: 'Beautiful yoga studio with meditation cushions and large windows'
    },
    {
      id: 'workshop',
      title: 'Workshop',
      image: '/prototype (1).png', // Replace with your actual image path
      alt: 'Meditation workshop with golden sunlight streaming through windows'
    },
    {
      id: 'learning',
      title: 'Learning hub',
      image: '/prototype.png', // Replace with your actual image path
      alt: 'Modern learning space with natural lighting and yoga mats'
    }
  ]
  const [activeTab, setActiveTab] = React.useState('retreats')
  return (
    <div className="max-w-none w-full -mt-21 pt-0">
      {/* Hero Section */}
      <div className="bg-[#faf8f5] grid grid-cols-1 lg:grid-cols-2 h-[100vh] sm:h-[100vh] w-full pt-0 mt-0 relative overflow-hidden">
        {/* Mobile: Text overlay on image, Desktop: Left side content */}
        <div className="absolute inset-0 lg:relative lg:inset-auto flex items-center px-4 sm:px-6 md:px-8 lg:pl-12 xl:pl-16 pt-16 sm:pt-20 md:pt-4 pb-6 sm:pb-8 lg:pb-0 order-1 lg:order-1 z-10 h-full lg:h-auto">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 max-w-[100%] sm:max-w-md md:max-w-lg lg:max-w-none w-full text-center lg:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white lg:text-gray-900 leading-tight drop-shadow-lg lg:drop-shadow-none font-serif">
              A sanctuary for{' '}
              <span className="block">stillness, soul and</span>
              <span className="block">self discovery</span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-100 lg:text-gray-600 leading-relaxed drop-shadow-md lg:drop-shadow-none px-2 lg:px-0">
              Modern wellness retreats and training experiences for global travelers.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link href="/retreat" className="relative inline-flex items-center px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-3.5 sm:py-4 md:py-4 bg-[#C7A961] hover:bg-[#b8985a] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm xs:text-base sm:text-lg">
                <span className="mr-6 xs:mr-8 sm:mr-10 md:mr-12 text-white">
                  Explore retreats
                </span>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-[#C7A961]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile: Background image, Desktop: Right side image */}
        <div className="h-[100vh] sm:h-[100vh] w-full order-2 lg:order-2 overflow-hidden rounded-none lg:rounded-bl-3xl relative">
          <Image
            src="/hero.svg"
            alt="Woman practicing yoga on a wooden terrace with mountain views"
            fill
            className="object-cover object-[center_20%] sm:object-[center_30%] lg:object-contain scale-110 sm:scale-105 lg:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent lg:bg-none"></div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8 leading-tight">
              What We Bring To You
            </h2>

            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-12">
              {services.map((service, index) => (
                <React.Fragment key={service.id}>
                  <button
                    onClick={() => setActiveTab(service.id)}
                    className={`text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 hover:scale-105 px-2 py-1 ${activeTab === service.id
                        ? 'text-[#C1A050] font-bold'
                        : 'text-gray-600 hover:text-[#C1A050]'
                      }`}
                  >
                    {service.title}
                  </button>
                  {index < services.length - 1 && (
                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 px-0">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-80 lg:h-96 w-full">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-4 sm:p-6 lg:p-8">
                    <div className="text-white">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <div className="w-10 sm:w-12 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Tab Content */}
          <div className="mt-8 sm:mt-12 lg:hidden px-0">
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl mx-4">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                {services.find(s => s.id === activeTab)?.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Discover transformative experiences through our carefully curated {services.find(s => s.id === activeTab)?.title.toLowerCase()} designed for holistic wellness and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RetreatsSection />

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
        <div className="w-full px-4">
          {/* Main Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
              Our Mission Is To Teach, Share, And Transform.
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
            {/* Large Left Card */}
            <div className="lg:row-span-2">
              <div className="relative h-[400px] sm:h-[500px] lg:h-full min-h-[600px] lg:min-h-[700px] rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg w-full">
                <Image
                  src="/new2.png"
                  alt="Meditation retreat interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-base sm:text-lg lg:text-xl font-medium">Step away from the noise,</p>
                    <p className="text-base sm:text-lg lg:text-xl font-medium">Sink into stillness,</p>
                    <p className="text-base sm:text-lg lg:text-xl font-medium">Learn, reflect, and return renewed—</p>
                    <p className="text-base sm:text-lg lg:text-xl font-semibold">A retreat that carries wisdom home.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Card */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg w-full">
              <Image
                src="/serene-yoga-retreat-with-practitioners-gracefully-engaged-poses-amidst-tranquil-surroundings-finding-peace-balance-ai-generative-ai.jpg"
                alt="Group meditation session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-medium">Breathe in calm, breathe out clarity,</p>
                  <p className="text-base sm:text-lg font-semibold">Listen deeply, learn gently</p>
                </div>
              </div>
            </div>

            {/* Bottom Right Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full">
              {/* Bottom Left Small Card */}
              <div className="relative h-48 sm:h-64 lg:h-80 rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg w-full">
                <Image
                  src="/new1.png"
                  alt="Waterfall meditation spot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm lg:text-base font-medium leading-tight">
                    A retreat is not escape—its reflection with purpose
                  </p>
                </div>
              </div>

              {/* Bottom Right Small Card */}
              <div className="relative h-48 sm:h-64 lg:h-80 rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg w-full">
                <Image
                  src="/new.png"
                  alt="Meditation room with practitioners"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm lg:text-base font-medium leading-tight">
                    Not just a pause, but a pathway. Where rest meets discovery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
  )
}

export default HeroSection