"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabse'

const ContactPage = () => {
  const [form, setForm] = useState({ retreat_name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    // Basic validation
    if (!form.retreat_name || !form.email || !form.phone) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.from('contact_requests').insert({
        retreat_name: form.retreat_name,
        email: form.email,
        phone: form.phone,
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSuccess(true);
      setForm({ retreat_name: '', email: '', phone: '' });
    } catch (err) {
      setError(err.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

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
      <section className="py-16 md:mt-22 mt-12 bg-white">
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
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Retreat name</label>
                  <input
                    type="text"
                    name="retreat_name"
                    autoComplete="off"
                    value={form.retreat_name}
                    onChange={handleChange}
                    placeholder="Enter retreat name"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-700 text-base placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-700 text-base placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="off"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-700 text-base placeholder-gray-400"
                  />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">Submitted successfully!</div>}
                <button
                  type="submit"
                  className="w-full bg-[#bfa46f] text-white font-semibold py-3 rounded-xl text-lg mt-4 hover:bg-[#a68c5c] transition duration-200"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Acquire now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Full-width three items section */}
    <section className="bg-[#FAF8F5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="flex justify-start">
          <div className="relative z-10 text-black bg-white p-6 rounded-full w-80 h-80 flex flex-col justify-center items-center shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-center">Contact us</h2>
            <p className="mb-4 text-center text-xs">
              Location: Available Globally
            </p>
            <div className="space-y-2 mb-4">
              <p className="flex items-center text-xs">
                <svg className="w-4 h-4 mr-2" fill="#C1A050" viewBox="0 0 24 24">
                  <path d="M6.62,10.79c1.44,2.83,3.76,5.15,6.59,6.59l2.2-2.2c0.27-0.27,0.67-0.36,1.02-0.24 c1.12,0.37,2.33,0.57,3.57,0.57c0.55,0,1,0.45,1,1V20c0,0.55-0.45,1-1,1c-9.39,0-17-7.61-17-17c0-0.55,0.45-1,1-1h3.5 c0.55,0,1,0.45,1,1c0,1.25,0.2,2.45,0.57,3.57c0.11,0.35,0.03,0.74-0.25,1.02L6.62,10.79z"/>
                </svg>
                <span className="font-medium">PHONE:</span> 
                <span className="ml-1 text-[#C1A050]">03 5432 1234</span>
              </p>
              <p className="flex items-center text-xs">
                <svg className="w-4 h-4 mr-2" fill="#C1A050" viewBox="0 0 24 24">
                  <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V8l7,5l7-5V19z M12,11L5,6h14L12,11z"/>
                </svg>
                <span className="font-medium">FAX:</span> 
                <span className="ml-1 text-[#C1A050]">03 5432 1234</span>
              </p>
              <p className="flex items-center text-xs">
                <svg className="w-4 h-4 mr-2" fill="#C1A050" viewBox="0 0 24 24">
                  <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
                </svg>
                <span className="font-medium">EMAIL:</span> 
                <span className="ml-1 text-[#C1A050] break-all">info@marco.com.au</span>
              </p>
            </div>
            <button className="w-32 bg-[#C1A050] text-white py-2 px-3 rounded-lg hover:bg-[#A68C42] transition duration-200 font-medium text-sm">
              Lets connect
            </button>
          </div>
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

export default ContactPage
