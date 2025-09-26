import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const AboutSections = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-screen sm:h-[70vh] lg:h-[80vh] w-full overflow-hidden relative -mt-20 sm:-mt-16 md:-mt-20 lg:-mt-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Desktop - 14.png')`,
            }}
          />
        </div>
        {/* Content overlay to push content below navbar */}
        <div className="absolute top-20 sm:top-16 md:top-20 lg:top-24 left-0 right-0 h-full pointer-events-none"></div>
      </section>

      {/* About Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8 leading-tight">
                About The Quiet Space
              </h2>
              <div className="prose prose-base sm:prose-lg text-gray-600 leading-relaxed">
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                  nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed
                  magna eget nibh in turpis. Consequat duis diam lacus arcu.
                  Faucibus venenatis felis id augue sit cursus pellentesque enim
                  arcu.
                </p>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Elementum felis magna pretium in tincidunt. Sus, nec turpis orci
                  lectus maecenas. Suspendisse sed magna eget nibh in turpis.
                  Consequat duis diam lacus arcu. Faucibus venenatis felis id
                  augue sit cursus pellentesqu.
                </p>
                <p className="text-sm sm:text-base">
                  Elementum felis magna pretium in tincidunt. Sus, nec turpis orci
                  lectus maecenas. Suspendisse sed magna eget nibh in turpis.
                  Consequat duis diam lacus arcu.
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main Image Container with Rounded Corners */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
                  <Image
                    src="/Frame 4291.png"
                    alt="Meditation space with mountain view"
                    width={1200} // Set appropriate width
                    height={380} // Match the height from lg:h-[380px]
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[380px] object-cover"
                    priority // Optional: for above-the-fold images
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Decorative Elements - Hidden on small screens */}
                <div className="hidden sm:block absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-yellow-100 rounded-full opacity-60 -z-10"></div>
                <div className="hidden sm:block absolute -bottom-6 -left-6 w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full opacity-60 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guide And Facilitators Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Our Guide And Facilitators
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {[
              {
                name: 'Devesh',
                role: 'Founder and lead teacher',
                src: '/new1.png', // Replace with actual image path for Devesh
                alt: 'Devesh - Founder and lead teacher',
              },
              {
                name: 'Jane Doe',
                role: 'Senior Yoga Instructor',
                src: '/new1.png', // Replace with actual image path for Jane
                alt: 'Jane Doe - Senior Yoga Instructor',
              },
              {
                name: 'John Smith',
                role: 'Meditation Guide',
                src: '/new1.png', // Replace with actual image path for John
                alt: 'John Smith - Meditation Guide',
              },
              {
                name: 'Alice Johnson',
                role: 'Wellness Facilitator',
                src: '/new1.png', // Replace with actual image path for Alice
                alt: 'Alice Johnson - Wellness Facilitator',
              },
            ].map((facilitator, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 sm:mb-6 mx-auto">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={facilitator.src}
                      alt={facilitator.alt}
                      width={256} // Match lg:w-64
                      height={256} // Match lg:h-64
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-1 sm:mb-2">
                  {facilitator.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  {facilitator.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {[
              {
                title: 'Integrity',
                description: 'Staying true to our essence',
                src: '/Frame 4316.png', // Add unique image for Integrity
                alt: 'Integrity - Group meditation',
              },
              {
                title: 'Intimacy',
                description: 'Authentic human bonds',
                src: '/Frame 4317.png', // Add unique image for Intimacy
                alt: 'Intimacy - Balanced stones',
              },
              {
                title: 'Presence',
                description: 'Living with moment',
                alt: 'Presence - Silhouette meditation',
                src: '/Frame 4318.png', // Add unique image for Presence
              },
              {
                title: 'Simplicity',
                description: 'Beauty in minimalism',
                src: '/Frame 4319.png', // Add unique image for Simplicity
                alt: 'Simplicity - Peaceful nature',
              },
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 sm:mb-6 mx-auto">
                  <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={value.src} // Use unique src from the object
                      alt={value.alt}
                      width={400} // Adjust based on your image size
                      height={288} // Match lg:h-72
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-1 sm:mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 mb-0 sm:mb-6 lg:mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Our Philosophy
            </h2>
          </div>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {[
              {
                title: 'Yoga',
                description: 'The path to balance',
                src: '/vector1.png',
                alt: 'Yoga philosophy icon',
              },
              {
                title: 'Nature',
                description: 'Our sacred companion',
                src: '/Vector2.png',
                alt: 'Nature philosophy icon',
              },
              {
                title: 'Sacredness',
                description: 'Living with awareness',
                src: '/Vector3.png',
                alt: 'Sacredness philosophy icon',
              },
              {
                title: 'Connection',
                description: 'With self and other',
                src: '/vectorr.png',
                alt: 'Connection philosophy icon',
              },
            ].map((philosophy, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 sm:mb-6 mx-auto">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={philosophy.src}
                      alt={philosophy.alt}
                      width={192} // Match lg:w-48
                      height={192} // Match lg:h-48
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-1 sm:mb-2">
                  {philosophy.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  {philosophy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSections;