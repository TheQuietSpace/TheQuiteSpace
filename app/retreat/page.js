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
  const [upcomingScroll, setUpcomingScroll] = useState(0);
  const [popularScroll, setPopularScroll] = useState(0);
  const [filterOptions, setFilterOptions] = useState({ locations: [], themes: [], dates: [] });
  const retreatsPerView = 3;

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch('/api/retreats');
        const data = await response.json();
        if (data && !data.error) {
          setRetreats(data);
          // Extract unique filter options from data
          const locations = Array.from(new Set(data.map(r => r.location).filter(Boolean)));
          const themes = Array.from(new Set(data.map(r => r.theme).filter(Boolean)));
          // Dates as YYYY-MM (month granularity)
          const dates = Array.from(new Set(data.map(r => r.date ? r.date.slice(0,7) : null).filter(Boolean)));
          setFilterOptions({ locations, themes, dates });
        }
      } catch (error) {
        console.error('Error fetching retreats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRetreats();
  }, []);


  // Filter for Upcoming Retreats
  const filteredUpcomingRetreats = retreats.filter((retreat) =>
    retreat.title?.toLowerCase().includes(search.toLowerCase()) &&
    (locationFilter ? retreat.location === locationFilter : true) &&
    (themeFilter ? retreat.theme === themeFilter : true) &&
    (dateFilter ? (retreat.date && retreat.date.startsWith(dateFilter)) : true)
  );

  // For 'Popular Retreats', just show a random selection (no popularity column)
  function getRandomSample(arr, n) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const currentPopularRetreats = getRandomSample(retreats, 6);

  // Horizontal scroll logic for Upcoming Retreats
  const maxUpcomingScroll = Math.max(0, filteredUpcomingRetreats.length - retreatsPerView);
  const currentUpcomingRetreats = filteredUpcomingRetreats.slice(upcomingScroll, upcomingScroll + retreatsPerView);

  // Horizontal scroll logic for Popular Retreats
  const maxPopularScroll = Math.max(0, currentPopularRetreats.length - retreatsPerView);
  const visiblePopularRetreats = currentPopularRetreats.slice(popularScroll, popularScroll + retreatsPerView);


  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="mt-5 h-[50vh] sm:h-[64vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 w-full h-130 sm:w-42 sm:h-42 lg:w-full lg:h-150 bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Frame 4386.png')`,
          }}
        />
        {/* Filters overlaid on Hero - Hidden on mobile */}
        <div className="absolute top-140 left-0 right-0 z-10 px-4 hidden sm:block">
          <div className="container mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 flex-nowrap overflow-x-auto scrollbar-hide">
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 flex-shrink-0 sm:w-40 md:w-48 lg:w-52"
                value={locationFilter}
                onChange={(e) => {
                  setLocationFilter(e.target.value);
                  setUpcomingScroll(0);
                }}
              >
                <option value="">Location</option>
                {filterOptions.locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 flex-shrink-0 sm:w-40 md:w-48 lg:w-52"
                value={themeFilter}
                onChange={(e) => {
                  setThemeFilter(e.target.value);
                  setUpcomingScroll(0);
                }}
              >
                <option value="">Theme</option>
                {filterOptions.themes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 p-2 rounded-xl text-gray-500 flex-shrink-0 sm:w-40 md:w-48 lg:w-52"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setUpcomingScroll(0);
                }}
              >
                <option value="">Date</option>
                {filterOptions.dates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              <div className="relative flex-shrink-0 sm:w-64 md:w-72 lg:w-80">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 p-2 rounded-xl pl-3 pr-10 w-full min-w-0"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setUpcomingScroll(0);
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Content Section - Upcoming Retreats (Horizontal Scroll) */}
      <div className="container bg-[#faf8f5] mx-auto px-2 sm:px-4 py-6 -mt-2">
        <h2 className="text-2xl sm:text-3xl md:mt-30 mt:22 font-semibold text-gray-800 mb-8 text-center">
          Upcoming Retreats
        </h2>
        <div className="relative">
          <button
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
            onClick={() => setUpcomingScroll(Math.max(0, upcomingScroll - 1))}
            disabled={upcomingScroll === 0}
            aria-label="Scroll left"
          >
            ◀
          </button>
          <div
            className="flex flex-row flex-nowrap overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-hide px-1 sm:px-10 py-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {currentUpcomingRetreats.length === 0 ? (
              <div className="text-center py-12 w-full">
                <p className="text-gray-600 text-lg">No retreats found matching your criteria.</p>
              </div>
            ) : (
              currentUpcomingRetreats.map((retreat) => (
                <div key={retreat.id} className="min-w-[85vw] max-w-[90vw] sm:min-w-[320px] sm:max-w-xs flex-shrink-0">
                  <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={retreat.image_url || '/placeholder.jpg'}
                        alt={retreat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                        {retreat.title || 'The Quiet Space'}
                      </h3>
                      <div className="space-y-1 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Date:</span> {retreat.date || 'N/A'}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Location:</span> {retreat.location || 'N/A'}
                        </p>
                      </div>
                      <Link
                        href={`/retreat/${retreat.id}`}
                        className="block w-full bg-white text-black border border-black font-medium py-2 px-2 sm:py-2.5 sm:px-4 rounded-md hover:bg-black hover:text-white active:bg-black active:text-white transition-colors duration-200 text-center"
                        aria-label={`View details for ${retreat.title}`}
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
            onClick={() => setUpcomingScroll(Math.min(maxUpcomingScroll, upcomingScroll + 1))}
            disabled={upcomingScroll >= maxUpcomingScroll}
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>


      {/* Popular Retreats Section (Random, Horizontal Scroll) */}
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mt-12 text-gray-800 mb-8 text-center">
          Popular Retreats
        </h2>
        <div className="relative">
          <button
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
            onClick={() => setPopularScroll(Math.max(0, popularScroll - 1))}
            disabled={popularScroll === 0}
            aria-label="Scroll left"
          >
            ◀
          </button>
          <div
            className="flex flex-row flex-nowrap overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-hide px-1 sm:px-10 py-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {visiblePopularRetreats.length === 0 ? (
              <div className="text-center py-12 w-full">
                <p className="text-gray-600 text-lg">No popular retreats found.</p>
              </div>
            ) : (
              visiblePopularRetreats.map((retreat) => (
                <div key={retreat.id} className="min-w-[85vw] max-w-[90vw] sm:min-w-[320px] sm:max-w-xs flex-shrink-0">
                  <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={retreat.image_url || '/placeholder.jpg'}
                        alt={retreat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                        {retreat.title || 'The Quiet Space'}
                      </h3>
                      <div className="space-y-1 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Date:</span> {retreat.date || 'N/A'}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Location:</span> {retreat.location || 'N/A'}
                        </p>
                      </div>
                      <Link
                        href={`/retreat/${retreat.id}`}
                        className="block w-full bg-white text-black border border-black font-medium py-2 px-2 sm:py-2.5 sm:px-4 rounded-md hover:bg-black hover:text-white active:bg-black active:text-white transition-colors duration-200 text-center"
                        aria-label={`View details for ${retreat.title}`}
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 disabled:opacity-30"
            onClick={() => setPopularScroll(Math.min(maxPopularScroll, popularScroll + 1))}
            disabled={popularScroll >= maxPopularScroll}
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetreatPage;