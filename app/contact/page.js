import React from 'react'
import Image from 'next/image'

const contacpage = () => {
  return (
    <div className='w-full'>
     <section className="h-[50vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-130  sm:w-42 sm:h-42 lg:w-full lg:h-150 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/gathering-community-members-around-large-circular-table-redwood-forest-dusk-surrounded-by-tall-trees-string-lights-creating-warm-atmosphere-conversation (1).jpg')`,
            }}
          />
        </div>
      </section>
      <section className="py-16 mt-30  bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16">
          <div className="lg:w-2/5 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partner With Us</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Share your retreats with the world</h3>
            <p className="text-lg text-gray-600">
              Partner with The Quiet Space to showcase your retreats, reach global audiences, and grow your community.
            </p>
          </div>
          <div className="lg:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Retreat name</label>
                  <input
                    type="text"
                    placeholder="Enter retreat name"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200">
                  Acquire now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/Frame 1410119196.png"
                alt="Brand Alignment"
                width={64}
                height={64}
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Brand Alignment</h4>
            <p className="text-sm text-gray-600">Be associated with a trusted, soulful wellness brand</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/Frame 1410119197.png"
                alt="Revenue Opportunities"
                width={64}
                height={64}
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Revenue Opportunities</h4>
            <p className="text-sm text-gray-600">Profit-sharing on workshops, retreats, and products</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/Frame 1410119198.png"
                alt="Global Reach"
                width={64}
                height={64}
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h4>
            <p className="text-sm text-gray-600">Showcase your work to a wider international audience online.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="relative py-12 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-white bg-blue-900 bg-opacity-75 p-6 rounded-lg max-w-md">
          <h2 className="text-3xl font-bold mb-4">Contact us</h2>
          <p className="mb-4">
            Location: [City, State, Country] (or Available Globally - Online & Offline)
          </p>
          <div className="space-y-2">
            <p>
              <span className="mr-2">📞</span> PHONE: 03 5432 1234
            </p>
            <p>
              <span className="mr-2">📅</span> FAX: 03 5432 1234
            </p>
            <p>
              <span className="mr-2">📧</span> EMAIL: info@marco.com.au
            </p>
          </div>
          <button className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-200">
            Lets connect
          </button>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/Rectangle 3731.png"
          alt="Map Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
    </section>
    </div>
  )
}

export default contacpage
