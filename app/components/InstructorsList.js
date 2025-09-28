'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function InstructorsList() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch retreats and extract teachers
  useEffect(() => {
    async function fetchInstructors() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('retreats')
          .select('id, title, teachers');
        
        if (error) throw error;

        // Flatten teachers array and associate with retreat
        const allInstructors = data.flatMap(retreat =>
          retreat.teachers.map(teacher => ({
            ...teacher,
            retreat_id: retreat.id,
            retreat_title: retreat.title
          }))
        );
        
        setInstructors(allInstructors);
      } catch (err) {
        setError('Failed to fetch instructors: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInstructors();
  }, []);

  if (loading) return <div className="text-center p-4 text-gray-700">Loading instructors...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Instructors</h1>
      {instructors.length === 0 ? (
        <p className="text-center text-gray-500">No instructors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={`${instructor.retreat_id}-${index}`}
              className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={instructor.image_url || 'https://via.placeholder.com/300x300?text=Instructor'}
                alt={instructor.name || 'Instructor'}
                className="w-full h-64 object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300x300?text=Instructor')}
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {instructor.name || 'Unknown Instructor'}
              </h2>
              <p className="text-gray-600 mb-3">
                <strong className="font-medium">Title:</strong> {instructor.title || 'Not specified'}
              </p>
              <p className="text-gray-600 mb-3">
                <strong className="font-medium">Retreat:</strong> {instructor.retreat_title}
              </p>
              <p className="text-gray-600 mb-3">
                <strong className="font-medium">Description:</strong>{' '}
                {instructor.description || 'No description available.'}
              </p>
              <p className="text-gray-600 mb-3">
                <strong className="font-medium">Focus Areas:</strong>{' '}
                {instructor.focus_areas ? instructor.focus_areas.split(',').join(', ') : 'None specified'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}