'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabse';
import { useRouter } from 'next/navigation';

export default function AddRetreatPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const dateInputRef = useRef(null);

  const validateForm = () => {
    if (!title.trim()) return 'Title is required.';
    if (!date) return 'Date is required.';
    if (!location.trim()) return 'Location is required.';
    if (!description.trim()) return 'Description is required.';
    if (!schedule.trim()) return 'Schedule is required.';
    if (!image) return 'Image is required.';
    if (new Date(date) < new Date()) return 'Date cannot be in the past.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError('');

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('retreat-images')
      .upload(fileName, image, { upsert: false });

    if (uploadError) {
      setError(`Upload error: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('retreat-images')
      .getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from('retreats').insert({
      title,
      date,
      location,
      description,
      schedule,
      image_url: imageUrl,
    });

    if (insertError) {
      setError(`Insert error: ${insertError.message}`);
    } else {
      setSuccess(true);
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setSchedule('');
      setImage(null);
      dateInputRef.current.value = '';
      setTimeout(() => setSuccess(false), 3000);
    }
    setUploading(false);
  };

  const handleReset = () => {
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setSchedule('');
    setImage(null);
    setError('');
    setSuccess(false);
    if (dateInputRef.current) dateInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Add a New Retreat</h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium flex justify-between items-center">
            <span>Retreat added successfully!</span>
            <button
              onClick={handleReset}
              className="ml-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Add Another
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Retreat Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="e.g., Serenity Retreat"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              ref={dateInputRef}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-lg font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="e.g., Rishikesh, India"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              rows={5}
              placeholder="e.g., A peaceful retreat for meditation and yoga..."
              required
            />
          </div>
          <div>
            <label htmlFor="schedule" className="block text-lg font-medium text-gray-700">
              Schedule
            </label>
            <textarea
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              rows={6}
              placeholder="e.g., Day 1: Arrival, Day 2: Yoga Session..."
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>
          <div className="flex gap-6">
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition duration-200"
            >
              {uploading ? 'Uploading...' : 'Add Retreat'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}