"use client";
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { useState, useEffect } from 'react';
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

  useEffect(() => {
  fetchWorkshops();
  fetchPopularWorkshops();
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

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (workshops.length === 0)
    return <div className="text-center py-10 text-gray-500">No upcoming workshops</div>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="h-[50vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-130  sm:w-42 sm:h-42 lg:w-full lg:h-150 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Frame 1.png')`,
            }}
          />
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-12 px-4 sm:px-6 mt-30 text-center">
        <h2 className="text-3xl font-bold mb-10">Key Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-40 h-40 sm:w-74 sm:h-74 rounded-full mt-5 overflow-hidden shadow-lg mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Workshops Section */}
      <section className="py-12 px-2 sm:px-6 bg-neutral-50">
        <div className="p-2 sm:p-6">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Workshops</h2>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:space-x-6 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-stretch min-w-[90vw] max-w-[100vw] md:min-w-[900px] md:max-w-[1000px] h-auto md:h-80 flex-shrink-0 hover:scale-105 transition-transform duration-300 snap-start"
              >
                {/* Image Section */}
                <div className="md:w-1/3 w-full flex items-center justify-center p-4 md:p-0">
                  {workshop.image_url ? (
                    <img
                      src={workshop.image_url}
                      alt={workshop.name}
                      className="rounded-xl object-cover w-full h-48 md:h-64 md:w-64"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                      <ImageIcon className="w-12 h-12 border " />
                    </div>
                  )}
                </div>
                {/* Details Section */}
                <div className="flex-1 flex flex-col justify-center px-4 py-4 md:py-0 md:px-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.name}</h3>
                  <div className="text-gray-700 text-sm mb-1">
                    <span className="block"><span className="font-medium">Date:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleDateString() : "No date"}</span>
                    <span className="block"><span className="font-medium">Time:</span> {workshop.event_date ? new Date(workshop.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "No time"}</span>
                    <span className="block"><span className="font-medium">Location:</span> {workshop.location || "No location"}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 mb-6 line-clamp-4">{workshop.description}</p>
                  <button className="w-full border border-gray-400 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200">
                    Register now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Workshops Section (now at the end) */}
      <section className="py-12 px-2 sm:px-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Workshops</h2>
         
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
                  className="min-w-[320px] max-w-xs flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col"
                >
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    {workshop.image_url ? (
                      <img
                        src={workshop.image_url}
                        alt={workshop.name}
                        className="object-cover w-full h-full"
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
                  <button className="w-full border border-gray-400 text-gray-900 py-2 rounded-lg font-medium mt-4 hover:bg-gray-100 transition-all duration-200">Register now</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutSections;