

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ParticipantsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from Supabase
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('bookings')
          .select('id, user_name, email, phone, payment_status, amount, created_at, wellness_program, accommodation, date, country, destination, number_of_persons, retreat:retreat_id(title)');
        
        if (error) throw error;
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch participants: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Handle participant removal
  async function handleRemove(id) {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state after deletion
      setBookings(bookings.filter(booking => booking.id !== id));
      alert('Participant removed successfully');
    } catch (err) {
      alert('Failed to remove participant: ' + err.message);
    }
  }

  if (loading) return <div>Loading participants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      {bookings.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Retreat</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Wellness Program</th>
                <th className="px-4 py-2 border">Accommodation</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Number of Persons</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{booking.retreat?.title || ''}</td>
                  <td className="px-4 py-2 border">{booking.user_name}</td>
                  <td className="px-4 py-2 border">{booking.email}</td>
                  <td className="px-4 py-2 border">{booking.phone}</td>
                  <td className="px-4 py-2 border">{booking.wellness_program || ''}</td>
                  <td className="px-4 py-2 border">{booking.accommodation || ''}</td>
                  <td className="px-4 py-2 border">{booking.date ? new Date(booking.date).toLocaleDateString() : ''}</td>
                  <td className="px-4 py-2 border">{booking.country || ''}</td>
                  <td className="px-4 py-2 border">{booking.destination || ''}</td>
                  <td className="px-4 py-2 border">{booking.number_of_persons || ''}</td>
                  <td className="px-4 py-2 border">{booking.payment_status}</td>
                  <td className="px-4 py-2 border">₹{booking.amount.toFixed(2)}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to remove this participant?')) {
                          handleRemove(booking.id);
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
}