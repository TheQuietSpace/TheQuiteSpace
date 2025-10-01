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
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  A space where you’re not just welcome, you belong.
                </p>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  Come as you are. This is your space.
                  Belong here. Breathe here. Be here.
                </p>
                <p className="mb-4 sm:mb-5 text-sm sm:text-base">
                  Here, you are seen. Here, you are held.
                </p>

                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  Welcome to The Quiet Space — a place created for your heart, your spirit, and your becoming.
                  This is where the world softens, the noise fades, and you finally feel at home.
                </p>
                <p className="mb-4 sm:mb-5 text-sm sm:text-base">
                  It is more than a retreat or a yoga studio. It is a space where you can return to yourself.
                  A space to breathe deeply, move mindfully, and rest completely. Whether you seek healing,
                  clarity, or simple stillness, you’ll find it here.
                </p>

                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-2">Why Choose The Quiet Space?</h3>
                <p className="mb-4 sm:mb-5 text-sm sm:text-base">
                  Because in today’s busy world, true peace is rare. Here, you are reminded that you don’t have to strive or prove.
                  You already belong. Transformation begins with stillness, and this place is here to hold you in that journey.
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  Step into your quiet space. Here, you are welcome. Here, you belong.
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
      <section className="py-8 bg-white mb-0">
        <div className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center bg-white mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl bg-white lg:text-4xl font-semibold text-gray-900 mb-4">
              Our Philosophy
            </h2>
          </div>

          {/* Philosophy — stacked, icon-left layout (pic-related) */}
          <div className="space-y-6">
            {[
              {
                title: 'Silence as Nourishment',
                description: 'In a world that never stops speaking, we choose silence not as emptiness, but as fullness. Here, silence becomes a teacher, a healer, and a friend.',
                src: '/2.svg',
                alt: 'Silence icon',
              },
              {
                title: 'Presence Before Perfection',
                description: 'We honor the beauty of being present over the illusion of being perfect. Every breath, every pause, every moment in this space is complete as it is.',
                src: '/3.svg',
                alt: 'Presence icon',
              },
              {
                title: 'Wholeness in Simplicity',
                description: 'We return to what is essential. Through yoga, meditation, and mindful living, we discover that life’s quietest moments carry the deepest truths.',
                src: '/4.svg',
                alt: 'Wholeness icon',
              },
              {
                title: 'Connection Through Stillness',
                description: 'True connection is born not in noise but in presence. The Quiet Space is where souls meet beyond words where we remember that we already belong.',
                src: '/5.svg',
                alt: 'Connection icon',
              },
              {
                title: 'Living with Gentle Power',
                description: 'From the stillness of the quiet, a strength arises soft yet unshakable, tender yet transformative. This is the power we carry back into the world.',
                src: '/6.svg',
                alt: 'Gentle power icon',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={192}
                      height={192}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSections;