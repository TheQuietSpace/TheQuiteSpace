'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <section className="py-12">
      <div className="max-w-9xl mx-2 ">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Retreats</h2>
        <div className="relative">
          <div className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {retreats.length === 0 ? (
              <p className="text-center text-gray-500 py-10 w-full">No retreats available.</p>
            ) : (
              retreats.map((retreat) => (
                <div
                  key={retreat.id}
                  className="flex-none w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 snap-center"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={retreat.image_url}
                      alt={retreat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{retreat.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">Date: {retreat.date}</p>
                    <p className="text-sm text-gray-600 mb-4">Location: {retreat.location}</p>
                    <Link href={`/retreat/${retreat.id}`}>
                      <button
                        className="w-full bg-white text-black border border-black py-2 px-4 rounded-md hover:bg-black hover:text-white active:bg-black active:text-white focus:outline-none transition-colors duration-200"
                        aria-label={`View details for ${retreat.title}`}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}