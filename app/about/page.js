import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const AboutSections = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-[75vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/participants-practice-yoga-sunrise-tranquil-studio-surrounded-by-nature-panoramic-views.jpg')`,
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 mt-5 lg:py-22 bg-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-30 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
                About The Quiet Space
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                  nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed
                  magna eget nibh in turpis. Consequat duis diam lacus arcu.
                  Faucibus venenatis felis id augue sit cursus pellentesque enim
                  arcu.
                </p>
                <p className="mb-6">
                  Elementum felis magna pretium in tincidunt. Sus, nec turpis orci
                  lectus maecenas. Suspendisse sed magna eget nibh in turpis.
                  Consequat duis diam lacus arcu. Faucibus venenatis felis id
                  augue sit cursus pellentesqu.
                </p>
                <p>
                  Elementum felis magna pretium in tincidunt. Sus, nec turpis orci
                  lectus maecenas. Suspendisse sed magna eget nibh in turpis.
                  Consequat duis diam lacus arcu.
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div className="order-1 mt-17 lg:order-2">
              <div className="relative">
                {/* Main Image Container with Rounded Corners */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/participants-practice-yoga-sunrise-tranquil-studio-surrounded-by-nature-panoramic-views.jpg"
                    alt="Meditation space with mountain view"
                    width={1200} // Set appropriate width
                    height={380} // Match the height from lg:h-[380px]
                    className="w-full h-80 md:h-96 lg:h-[380px] object-cover"
                    priority // Optional: for above-the-fold images
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-100 rounded-full opacity-60 -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-100 rounded-full opacity-60 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guide And Facilitators Section */}
      <section className="py-16 md:py-24 lg:py-12 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-18">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Our Guide And Facilitators
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 mx-auto">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/new1.png"
                      alt="Devesh - Founder and lead teacher"
                      width={256} // Match lg:w-64
                      height={256} // Match lg:h-64
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  Devesh
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Founder and lead teacher
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 lg:py-12 bg-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                title: 'Integrity',
                description: 'Staying true to our essence',
                alt: 'Integrity - Group meditation',
              },
              {
                title: 'Intimacy',
                description: 'Authentic human bonds',
                alt: 'Intimacy - Balanced stones',
              },
              {
                title: 'Presence',
                description: 'Living with moment',
                alt: 'Presence - Silhouette meditation',
              },
              {
                title: 'Simplicity',
                description: 'Beauty in minimalism',
                alt: 'Simplicity - Peaceful nature',
              },
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 mx-auto">
                  <div className="w-full h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/new1.png"
                      alt={value.alt}
                      width={400} // Adjust based on your image size
                      height={256} // Match lg:h-64
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 md:py-24 mb-10 lg:py-10 bg-gray-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-15">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Our Philosophy
            </h2>
          </div>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
                <div className="relative mb-6 mx-auto">
                  <div className="w-20 h-20 md:w-44 md:h-44 lg:w-48 lg:h-48 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={philosophy.src}
                      alt={philosophy.alt}
                      width={192} // Match lg:w-48
                      height={192} // Match lg:h-48
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 mb-2">
                  {philosophy.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
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