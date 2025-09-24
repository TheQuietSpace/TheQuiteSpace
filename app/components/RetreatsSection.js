'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RetreatsSection() {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch('/api/retreats');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch retreats');
        }

        setRetreats(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRetreats();
  }, []);

  if (loading) return <p className="text-center text-gray-600 py-10">Loading retreats...</p>;
  if (error) return <p className="text-center text-red-600 py-10">Error: {error}</p>;

  return (
    <section className="py-1 md:mt-18 mt-8 bg-[#FAF8F5]">
      <div className="max-w-9xl mx-auto px-4 sm:px-3 lg:px-1">
        <h2 className="text-4xl font-semibold text-gray-900 text-center mb-14 ">Retreats</h2>
        <div className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
          {retreats.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No retreats available.</p>
          ) : (
            <div className="flex space-x-10">
              {retreats.map((retreat) => (
                <div
                  key={retreat.id}
                  className="inline-block w-92 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative w-full h-88">
                    <Image
                      src={retreat.image_url}
                      alt={retreat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-normal text-gray-900 mb-2">{retreat.title}</h3>
                    <p className="text-md text-gray-900 mb-1">Date: {retreat.date}</p>
                    <p className="text-md text-gray-900 mb-4">Location: {retreat.location}</p>
                    <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md border border-black hover:bg-black hover:text-white transition duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}