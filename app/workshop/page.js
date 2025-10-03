"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { supabase } from '@/lib/supabse';
import {
  Calendar as CalendarIcon,
  Image as ImageIcon
} from "lucide-react";

const highlights = [
  {
    title: "Experiential Learning",
    description: "Hands-on practices, activities",
    image: "/Frame 4292.png", // replace with your image
  },
  {
    title: "Expert Facilitators",
    description: "Certified teachers & guides",
    image: "/Frame 429.png", // replace with your image
  },
  {
    title: "Community",
    description: "Connect with like-minded seekers",
    image: "/Frame 4293.png", // replace with your image
  },
  {
    title: "Integration",
    description: "Tools to continue your journey",
    image: "/Frame 4294.png", // replace with your image
  },
];

const AboutSections = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularWorkshops, setPopularWorkshops] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    fetchWorkshops();
    fetchPopularWorkshops();
  }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoadingTestimonials(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('category', 'Workshop')
        .order('created_at', { ascending: false });
      if (!error) setTestimonials(data);
      setLoadingTestimonials(false);
    }
    fetchTestimonials();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .order("event_date", { ascending: true }); // upcoming first
    if (error) {
      setError(error.message);
    } else {
      setWorkshops(data);
    }
    setLoading(false);
  };

  // Fetch popular workshops (example: filter by a 'popular' boolean column, or by attendance)
  const fetchPopularWorkshops = async () => {
    setLoadingPopular(true);
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .order("event_date", { ascending: false });
    if (error) {
      setErrorPopular(error.message);
    } else {
      // Pick 3 random workshops if available
      let randomWorkshops = [];
      if (data && data.length > 0) {
        randomWorkshops = [...data].sort(() => 0.5 - Math.random()).slice(0, 3);
      }
      setPopularWorkshops(randomWorkshops);
    }
    setLoadingPopular(false);
  };

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
    setFormData({ name: '', email: '', phone: '' });
    setFormError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setFormError('Name and Email are required.');
      return;
    }
    setFormLoading(true);
    const { error } = await supabase
      .from('workshop_registrations')
      .insert({
        workshop_id: selectedWorkshop.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
    if (error) {
      setFormError(error.message);
    } else {
      alert('Registration successful!');
      closeModal();
    }
    setFormLoading(false);
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (workshops.length === 0)
    return <div className="text-center py-10 text-gray-500">No upcoming workshops</div>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('/Frame 1.png')`,
            }}
          />
        </div>
        {/* Optional future hero content container */}
        {/* <div className="relative z-10 flex h-full items-center justify-center px-4 text-white">
          <h1 className="text-3xl sm:text-4xl font-semibold">Workshops</h1>
        </div> */}
      </section>

      {/* Key Highlights Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 md:py-16 text-center bg-white">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-10">Key Highlights</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full mt-4 sm:mt-5 overflow-hidden shadow-lg mb-4 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1 max-w-[220px] sm:max-w-none">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Workshops Section */}
      <section className="py-12 px-2 sm:px-6">
        <div className="p-2 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-center flex-1">Upcoming Workshops</h2>
            <button className="border border-gray-400 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 ml-4">
              View All
            </button>
          </div>
            <div
              className="flex flex-row flex-nowrap gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide px-1 md:px-8"
              style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
            >
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-stretch w-[85vw] sm:w-[80vw] md:w-[640px] flex-shrink-0 hover:scale-[1.02] transition-transform duration-300 snap-start"
                >
                  {/* Image Section */}
                  <div className="w-full md:w-2/5 flex items-center justify-center p-2 md:p-3">
                    {workshop.image_url ? (
                      <Image
                        src={workshop.image_url}
                        alt={workshop.name}
                        width={400}
                        height={250}
                        className="rounded-xl object-cover w-full h-44 md:h-full md:min-h-[240px] max-h-[300px]"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-44 md:min-h-[240px] bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  {/* Details Section */}
                  <div className="flex-1 flex flex-col justify-between px-4 py-2 md:py-5 md:px-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">{workshop.name}</h3>
                      <div className="text-gray-700 text-sm md:text-base mb-2">
                        <span className="block"><span className="font-medium">Date:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleDateString() : "No date"}</span>
                        <span className="block"><span className="font-medium">Time:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "No time"}</span>
                        <span className="block"><span className="font-medium">Location:</span> {workshop.location || "No location"}</span>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base line-clamp-2 md:line-clamp-3">{workshop.description}</p>
                    </div>
                    <button 
                      onClick={() => openModal(workshop)}
                      className="w-full border border-gray-400 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                    >
                      Register now
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Popular Workshops Section */}
      <section className="py-12 md:py-20 px-2 sm:px-8 bg-white">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-center flex-1">Popular Workshops</h2>
            <button className="border border-gray-400 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 ml-4">
              View All
            </button>
          </div>
        {loadingPopular ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : errorPopular ? (
          <div className="text-center py-10 text-red-500">{errorPopular}</div>
        ) : popularWorkshops.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No popular workshops</div>
        ) : (
          <div className="relative">
            {popularWorkshops.length > 3 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
                  onClick={() => {
                    const container = document.getElementById('popular-workshops-scroll');
                    if (container) container.scrollLeft -= 350;
                  }}
                  aria-label="Scroll left"
                >
                  ◀
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
                  onClick={() => {
                    const container = document.getElementById('popular-workshops-scroll');
                    if (container) container.scrollLeft += 350;
                  }}
                  aria-label="Scroll right"
                >
                  ▶
                </button>
              </>
            )}
            <div
              id="popular-workshops-scroll"
              className="flex overflow-x-auto gap-8 scrollbar-hide px-2 py-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {popularWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="min-w-[270px] sm:min-w-[300px] max-w-xs flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col"
                >
                  <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    {workshop.image_url ? (
                      <Image
                        src={workshop.image_url}
                        alt={workshop.name}
                        width={320}
                        height={192}
                        className="object-cover w-full h-full"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-12 h-12 border " />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{workshop.name}</h3>
                  <div className="text-gray-700 text-sm mb-1">
                    <span className="block"><span className="font-medium">Date:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleDateString() : "No date"}</span>
                    <span className="block"><span className="font-medium">Time:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "No time"}</span>
                    <span className="block"><span className="font-medium">Location:</span> {workshop.location || "No location"}</span>
                  </div>
                  <button 
                    onClick={() => openModal(workshop)}
                    className="w-full border border-gray-400 text-gray-900 py-2 rounded-lg font-medium mt-4 hover:bg-gray-100 transition-all duration-200"
                  >
                    Register now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Register for {selectedWorkshop?.name}</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {formLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Workshop Testimonials</h2>
          {loadingTestimonials ? (
            <p className="text-center">Loading testimonials...</p>
          ) : (
            <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-[300px] max-w-[300px] bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.524 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Continuation: How It Works & CTA */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <ul className="list-disc ml-6 space-y-4 marker:text-[#c1a050] text-lg text-gray-700">
            <li><strong>Sign up online</strong> through our secure form</li>
            <li><strong>Choose your 4 classes/week</strong> from our schedule (in-studio, online, or hybrid)</li>
            <li><strong>Show up, practice, transform</strong></li>
            <li><strong>Take your practice home</strong> with simple techniques and resources we share</li>
          </ul>

          <h3 className="mt-10 text-2xl font-semibold">Ready to Begin?</h3>
          <p className="text-lg text-gray-700 mt-4">Invest in your health, your peace, and your spirit.</p>
          <p className="text-lg text-gray-700 mt-2 mb-6">Click below to sign up and step onto the mat with us.</p>
          <div className="flex justify-center">
            <a
              href="#featured-articles"
              className="inline-flex items-center bg-[#c1a050] text-white px-6 py-3 rounded-lg hover:bg-[#a88d42] font-medium"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSections;