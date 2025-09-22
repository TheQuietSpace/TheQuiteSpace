
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
  <h2 className="text-2xl sm:text-3xl font-semibold mt-6 sm:mt-12 text-gray-800 mb-8 text-center">
    Upcoming Retreats
  </h2>
  <div className="max-w-9xl mx-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {filteredRetreats.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-600 text-lg">No retreats found matching your criteria.</p>
        </div>
      ) : (
        filteredRetreats.map((retreat) => (
          <div key={retreat.id} className="w-full">
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={retreat.image_url || '/placeholder.jpg'}
                  alt={retreat.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {retreat.title || 'The Quiet Space'}
                </h3>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {retreat.date || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {retreat.location || 'N/A'}
                  </p>
                </div>
                <Link 
                  href={`/retreat/${retreat.id}`} 
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md border border-gray-300 transition-colors duration-200 text-center"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default RetreatPage;
