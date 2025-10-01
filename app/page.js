"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import RetreatsSection from './components/RetreatsSection';
import TestimonialsSection from './components/TestimonialsSection';
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
    <div className="bg-[#FAF8F5] max-w-none w-full -mt-21 pt-0">
      {/* Background Vector Image -  bg-white mt-4 mb-4 shadow-sm max-w-360 mx-auto Hidden on mobile */}
      <div
        className="hidden lg:block absolute inset-0 w-full h-full opacity-10 sm:opacity-15 z-0"
        style={{
          backgroundImage: "url('/Vector.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '70%  80%',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-screen w-full pt-0 mt-0 relative">
        {/* Mobile: Text overlay on image, Desktop: Left side content */}
        <div className="absolute inset-0 lg:relative lg:inset-auto flex items-center px-4 sm:px-6 md:px-8 lg:pl-12 xl:pl-16 pt-16 sm:pt-20 md:pt-4 pb-6 sm:pb-8 lg:pb-0 order-1 lg:order-1 z-10 min-h-[80vh] lg:min-h-0">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-[100%] sm:max-w-md md:max-w-lg lg:max-w-none w-full text-center lg:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white lg:text-gray-900 leading-tight drop-shadow-md lg:drop-shadow-none font-serif">
              A sanctuary for{' '}
              <span className="block">stillness, soul and</span>
              <span className="block">self discovery</span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-100 lg:text-gray-600 leading-relaxed drop-shadow-sm lg:drop-shadow-none">
              Modern wellness retreats and training experiences for global travelers.
            </p>

            <Link href="/retreat" className="relative inline-flex items-center px-4 xs:px-6 sm:px-8 md:px-10 py-2 xs:py-2.5 sm:py-3 md:py-4 bg-[#C7A961] hover:bg-[#b8985a] text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-xs xs:text-sm sm:text-base">
              <span className="mr-4 xs:mr-5 sm:mr-6 md:mr-7 text-white">
                Explore retreats
              </span>
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                <svg
                  className="w-4 h-4 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#C7A961]"
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
        {/* Mobile: Background image, Desktop: Right side image */}
        <div className="min-h-[80vh] lg:min-h-screen w-full order-2 lg:order-2 overflow-hidden rounded-none lg:rounded-bl-3xl relative">
          <Image
            src="/woman-practices-yoga-morning-terrace-fresh-air (2).jpg"
            alt="Woman practicing yoga on a wooden terrace with mountain views"
            fill
            className="object-cover object-right lg:object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent lg:bg-none"></div>
        </div>
      </div>

      <section className="py-16 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">
              What We Bring To You
            </h2>

            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
              {services.map((service, index) => (
                <React.Fragment key={service.id}>
                  <button
                    onClick={() => setActiveTab(service.id)}
                    className={`text-lg lg:text-xl font-medium transition-all duration-300 hover:scale-105 ${activeTab === service.id
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
              >
                {/* Image Container */}
                <div className="relative h-80 lg:h-96 w-full">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                    <div className="text-white">
                      <h3 className="text-xl lg:text-2xl font-medium mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Tab Content (Optional - shows description for active tab) */}
          <div className="mt-12 lg:hidden">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {services.find(s => s.id === activeTab)?.title}
              </h3>
              <p className="text-gray-600">
                Discover transformative experiences through our carefully curated {services.find(s => s.id === activeTab)?.title.toLowerCase()} designed for holistic wellness and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <RetreatsSection />
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 leading-tight">
              Our Mission Is To Teach, Share, And Transform.
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Large Left Card */}
            <div className="lg:row-span-2">
              <div className="relative h-[500px] lg:h-full min-h-[700px] rounded-2xl overflow-hidden shadow-lg">
                {/* Replace with your image */}
                <Image
                  src="/new2.png"
                  alt="Meditation retreat interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                  <div className="space-y-2">
                    <p className="text-lg lg:text-xl font-medium">Step away from the noise,</p>
                    <p className="text-lg lg:text-xl font-medium">Sink into stillness,</p>
                    <p className="text-lg lg:text-xl font-medium">Learn, reflect, and return renewed—</p>
                    <p className="text-lg lg:text-xl font-semibold">A retreat that carries wisdom home.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Card */}
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              {/* Replace with your image */}
              <Image
                src="/serene-yoga-retreat-with-practitioners-gracefully-engaged-poses-amidst-tranquil-surroundings-finding-peace-balance-ai-generative-ai.jpg"
                alt="Group meditation session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="space-y-1">
                  <p className="text-lg font-medium">Breathe in calm, breathe out clarity,</p>
                  <p className="text-lg font-semibold">Listen deeply, learn gently</p>
                </div>
              </div>
            </div>

            {/* Bottom Right Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {/* Bottom Left Small Card */}
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                {/* Replace with your image */}
                <Image
                  src="/new1.png"
                  alt="Waterfall meditation spot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm lg:text-base font-medium leading-tight">
                    A retreat is not escape—its reflection with purpose
                  </p>
                </div>
              </div>

              {/* Bottom Right Small Card */}
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                {/* Replace with your image */}
                <Image
                  src="/new.png"
                  alt="Meditation room with practitioners"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm lg:text-base font-medium leading-tight">
                    Not just a pause, but a pathway. Where rest meets discovery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
    </div>
  )
}

export default HeroSection