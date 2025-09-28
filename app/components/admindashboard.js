'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from 'recharts';

export default function Dashboardnew() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Prepare data for charts
  const getChartData = () => {
    // Bookings over time (group by date)
    const bookingsByDate = bookings.reduce((acc, booking) => {
      const date = new Date(booking.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const lineData = Object.entries(bookingsByDate).map(([date, count]) => ({ date, count }));

    // Payment status distribution
    const statusCounts = bookings.reduce((acc, booking) => {
      acc[booking.payment_status] = (acc[booking.payment_status] || 0) + 1;
      return acc;
    }, {});
    const pieData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));

    // Revenue by retreat (assuming retreat_id and amount)
    const revenueByRetreat = bookings.reduce((acc, booking) => {
      if (booking.payment_status === 'paid') {
        acc[booking.retreat_id] = (acc[booking.retreat_id] || 0) + booking.amount;
      }
      return acc;
    }, {});
    const barData = Object.entries(revenueByRetreat).map(([retreat_id, revenue]) => ({
      retreat_id: `Retreat #${retreat_id}`,
      revenue,
    }));

    return { lineData, pieData, barData };
  };

  const { lineData, pieData, barData } = getChartData();

  const COLORS = ['#4CAF50', '#FF9800', '#F44336']; // Green, Orange, Red for paid, pending, failed

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Dashboard</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Booking Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of bookings as of {new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Bookings</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            ₹{bookings.reduce((acc, b) => acc + (b.payment_status === 'paid' ? b.amount : 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pending Bookings</h3>
          <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-2">
            {bookings.filter(b => b.payment_status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bookings Over Time */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Bookings Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#666' }} />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Payment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#666' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Retreat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue by Retreat</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="retreat_id" stroke="#666" tick={{ fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#666' }} />
            <Bar dataKey="revenue" fill="#82ca9d" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map((booking) => (
                <tr key={booking.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{booking.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{booking.user_name}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{booking.email}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{booking.phone}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">₹{booking.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.payment_status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : booking.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {booking.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{new Date(booking.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}