
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RetreatPage = () => {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [themeFilter, setThemeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch('/api/retreats');
        const data = await response.json();
        if (data && !data.error) {
          setRetreats(data);
        }
      } catch (error) {
        console.error('Error fetching retreats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetreats();
  }, []);

  const filteredRetreats = retreats.filter((retreat) =>
    retreat.title?.toLowerCase().includes(search.toLowerCase()) &&
    (locationFilter ? retreat.location === locationFilter : true) &&
    (themeFilter ? retreat.theme === themeFilter : true) &&
    (dateFilter ? retreat.date === dateFilter : true)
  );

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className=" mt-5 h-[50vh] sm:h-[64vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 w-full h-130  sm:w-42 sm:h-42 lg:w-full lg:h-150  bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Frame 4386.png')`,
          }}
        />
        {/* Filters overlaid on Hero - Hidden on mobile */}
        <div className="absolute top-140 left-0 right-0 z-10 px-4 hidden sm:block">
          <div className="container mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 w-full sm:w-40 md:w-48 lg:w-52"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">Location</option>
                <option value="Bali">Bali</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Tuscany">Tuscany</option>
              </select>
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 w-full sm:w-40 md:w-48 lg:w-52"
                value={themeFilter}
                onChange={(e) => setThemeFilter(e.target.value)}
              >
                <option value="">Theme</option>
                <option value="Yoga">Yoga</option>
                <option value="Meditation">Meditation</option>
                <option value="Wellness">Wellness</option>
              </select>
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 w-full sm:w-40 md:w-48 lg:w-52"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Date</option>
                <option value="2025-10">October 2025</option>
                <option value="2025-11">November 2025</option>
                <option value="2025-12">December 2025</option>
              </select>
              <div className="relative w-full sm:w-64 md:w-72 lg:w-140">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 p-2 rounded-xl pl-8 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="absolute left-2 top-2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 -mt-4">
        {/* Retreats Grid */}
        <h2 className="text-3xl font-semibold mt-6 sm:mt-12 text-gray-800 mb-8 text-center sm:text-2xl md:text-3xl">
          Upcoming Retreats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRetreats.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">No retreats found matching your criteria.</p>
          ) : (
            filteredRetreats.map((retreat) => (
              <div
                key={retreat.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 max-w-xs sm:max-w-md mx-auto"
              >
                <img
                  src={retreat.image_url || '/placeholder.jpg'}
                  alt={retreat.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{retreat.title || 'The Quiet Space'}</h3>
                  <p className="text-gray-600 mb-1">Date: {retreat.date || 'N/A'}</p>
                  <p className="text-gray-600 mb-2">Location: {retreat.location || 'N/A'}</p>
                  <Link 
                    href={`/retreat/${retreat.id}`} 
                    className="block w-full bg-gray-200 text-gray-800 py-1.5 rounded-lg hover:bg-gray-300 transition-colors text-center"
                  >
                    View details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RetreatPage;
