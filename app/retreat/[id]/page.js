"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function RetreatDetails() {
  const params = useParams();
  const { id } = params;
  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetreat = async () => {
      try {
        const response = await fetch(`/api/retreats/${id}`);
        const data = await response.json();
        if (data && !data.error) {
          setRetreat(data);
        }
      } catch (error) {
        console.error('Error fetching retreat:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRetreat();
    }
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  if (!retreat) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Retreat not found.</div>;
  }

  const includedItems = [
    { icon: '🧘', label: '7 days of Yoga' },
    { icon: '🥗', label: 'Organic meals' },
    { icon: '🗺️', label: 'Sacred location' },
    { icon: '📚', label: 'Free Workshop' },
    { icon: '🌳', label: 'Nature walk' },
  ];

  // Parse schedule from API data or use default
  const scheduleItems = retreat.schedule ? 
    (typeof retreat.schedule === 'string' ? 
      retreat.schedule.split('\n').filter(item => item.trim()) :
      Array.isArray(retreat.schedule) ? retreat.schedule : 
      [
        'Day 1 - Arrival & Orientation',
        'Day 2 - Deepening Practice', 
        'Day 3 - Immersion'
      ]
    ) : [
      'Day 1 - Arrival & Orientation',
      'Day 2 - Deepening Practice',
      'Day 3 - Immersion'
    ];

  const smallImages = [
    '/placeholder-small1.jpg',
    '/placeholder-small2.jpg', 
    '/placeholder-small3.jpg',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-lg text-gray-700">
            Retreat: {retreat.title || 'The quiet space'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative">
              <img
                src={retreat.image_url || '/placeholder.jpg'}
                alt={retreat.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-3 shadow-md hover:bg-opacity-100 transition-all">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-3 shadow-md hover:bg-opacity-100 transition-all">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Small Images */}
            <div className="grid grid-cols-3 gap-4">
              {smallImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-32 lg:h-40 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {retreat.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis ornare magna eu pellentesque. Suspendisse enim ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis ornare magna eu pellentesque arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque lorem ipsum dolor sit amet consectetur adipiscing elit cursus sit.'}
              </p>
            </div>

            {/* What's included */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What is included</h2>
              <div className="flex justify-between items-center">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-gray-100 rounded-full p-4 mb-3 w-16 h-16 flex items-center justify-center shadow-sm">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium max-w-20 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Schedule</h2>
              <div className="space-y-2">
                {scheduleItems.map((item, index) => (
                  <p key={index} className="text-gray-600 text-base">{item}</p>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <div className="pt-4">
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Book your spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}