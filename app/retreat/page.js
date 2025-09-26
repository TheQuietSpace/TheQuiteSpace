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
        <div className="absolute top-140 left-0 right-0 z-10 px-4 hidden lg:block">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg flex flex-wrap items-center justify-center gap-3 lg:gap-6">
              <select
                className="border border-gray-300 p-2 lg:p-3 rounded-xl text-gray-500 text-sm lg:text-base w-40 lg:w-48"
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
                className="border border-gray-300 p-2 lg:p-3 rounded-xl text-gray-500 text-sm lg:text-base w-40 lg:w-48"
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
                className="border border-gray-300 p-2 lg:p-3 rounded-xl text-gray-500 text-sm lg:text-base w-40 lg:w-48"
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
              <div className="relative w-64 lg:w-80">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 p-2 lg:p-3 rounded-xl pl-8 lg:pl-10 w-full text-sm lg:text-base"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setUpcomingScroll(0);
                  }}
                />
                <span className="absolute left-2 lg:left-3 top-2 lg:top-3 text-gray-400 text-sm lg:text-base">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters - Visible only on mobile/tablet */}
      <div className="lg:hidden px-4 py-6 bg-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <select
            className="border border-gray-300 p-3 rounded-xl text-gray-500 text-sm w-full"
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
            className="border border-gray-300 p-3 rounded-xl text-gray-500 text-sm w-full"
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
            className="border border-gray-300 p-3 rounded-xl text-gray-500 text-sm w-full sm:col-span-2"
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
          <div className="relative sm:col-span-2">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-3 rounded-xl pl-10 w-full text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setUpcomingScroll(0);
              }}
            />
            <span className="absolute left-3 top-3 text-gray-400 text-sm">🔍</span>
          </div>
        </div>
      </div>

      {/* Content Section - Upcoming Retreats (Horizontal Scroll) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
          Upcoming Retreats
        </h2>
        <div className="relative">
          <button
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            onClick={() => setUpcomingScroll(Math.max(0, upcomingScroll - 1))}
            disabled={upcomingScroll === 0}
            aria-label="Scroll left"
          >
            ◀
          </button>
          <div
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-hide px-0 sm:px-12 py-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {currentUpcomingRetreats.length === 0 ? (
              <div className="text-center py-12 w-full">
                <p className="text-gray-600 text-base sm:text-lg">No retreats found matching your criteria.</p>
              </div>
            ) : (
              currentUpcomingRetreats.map((retreat) => (
                <div key={retreat.id} className="flex-shrink-0 w-72 sm:w-80 lg:w-96">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={retreat.image_url || '/placeholder.jpg'}
                        alt={retreat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                        {retreat.title || 'The Quiet Space'}
                      </h3>
                      <div className="space-y-2 mb-4 sm:mb-6">
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Date:</span> {retreat.date || 'N/A'}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Location:</span> {retreat.location || 'N/A'}
                        </p>
                      </div>
                      <Link 
                        href={`/retreat/${retreat.id}`} 
                        className="block w-full bg-white hover:bg-black text-black hover:text-white font-medium py-3 px-4 rounded-lg border border-black transition-colors duration-200 text-center text-sm sm:text-base"
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
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            onClick={() => setUpcomingScroll(Math.min(maxUpcomingScroll, upcomingScroll + 1))}
            disabled={upcomingScroll >= maxUpcomingScroll}
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Popular Retreats Section (Random, Horizontal Scroll) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
          Popular Retreats
        </h2>
        <div className="relative">
          <button
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            onClick={() => setPopularScroll(Math.max(0, popularScroll - 1))}
            disabled={popularScroll === 0}
            aria-label="Scroll left"
          >
            ◀
          </button>
          <div
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-hide px-0 sm:px-12 py-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {visiblePopularRetreats.length === 0 ? (
              <div className="text-center py-12 w-full">
                <p className="text-gray-600 text-base sm:text-lg">No popular retreats found.</p>
              </div>
            ) : (
              visiblePopularRetreats.map((retreat) => (
                <div key={retreat.id} className="flex-shrink-0 w-72 sm:w-80 lg:w-96">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={retreat.image_url || '/placeholder.jpg'}
                        alt={retreat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                        {retreat.title || 'The Quiet Space'}
                      </h3>
                      <div className="space-y-2 mb-4 sm:mb-6">
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Date:</span> {retreat.date || 'N/A'}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          <span className="font-medium">Location:</span> {retreat.location || 'N/A'}
                        </p>
                      </div>
                      <Link 
                        href={`/retreat/${retreat.id}`} 
                        className="block w-full bg-white hover:bg-black text-black hover:text-white font-medium py-3 px-4 rounded-lg border border-black transition-colors duration-200 text-center text-sm sm:text-base"
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
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 disabled:opacity-30 hover:bg-gray-50 transition-colors"
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