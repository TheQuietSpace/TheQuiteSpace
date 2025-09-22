'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabse';
import { useRouter } from 'next/navigation';

export default function AddRetreatPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [included, setIncluded] = useState('');
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  // New states for teachers and FAQs
  const [teachers, setTeachers] = useState([]); // Array of { name, title, description, focus_areas, image, preview }
  const [faqs, setFaqs] = useState([]); // Array of { category, faqs: [{ question, answer }] }
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const dateInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      galleryPreviews.forEach(url => URL.revokeObjectURL(url));
      teachers.forEach(teacher => {
        if (teacher.preview) URL.revokeObjectURL(teacher.preview);
      });
    };
  }, [imagePreview, galleryPreviews, teachers]);

  const validateForm = () => {
    if (!title.trim()) return 'Title is required.';
    if (!date) return 'Date is required.';
    if (!location.trim()) return 'Location is required.';
    if (!description.trim()) return 'Description is required.';
    if (!schedule.trim()) return 'Schedule is required.';
    if (!included.trim()) return 'Included is required.';
    if (new Date(date) < new Date()) return 'Date cannot be in the past.';
    // New validations
    if (teachers.some(t => !t.name.trim() || !t.title.trim() || !t.description.trim() || !t.focus_areas.trim())) {
      return 'All teacher fields are required if added.';
    }
    if (faqs.some(cat => !cat.category.trim() || cat.faqs.some(q => !q.question.trim() || !q.answer.trim()))) {
      return 'All FAQ categories, questions, and answers are required if added.';
    }
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

    let imageUrl = null;
    if (image) {
      const fileExt = image.name.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
        setError('Main image must be a JPG, JPEG, PNG, or GIF.');
        setUploading(false);
        return;
      }
      const fileName = `main_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('retreat-images')
        .upload(fileName, image, { upsert: false });

      if (uploadError) {
        setError(`Main image upload error: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('retreat-images')
        .getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    const galleryUrls = [];
    if (gallery.length > 0) {
      const uploadPromises = Array.from(gallery).map(async (file, index) => {
        const fileExt = file.name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
          throw new Error(`Gallery image ${index + 1} must be a JPG, JPEG, PNG, or GIF.`);
        }
        const fileName = `gallery_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('retreat-images')
          .upload(fileName, file, { upsert: false });

        if (uploadError) {
          throw new Error(`Gallery image ${index + 1} upload error: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('retreat-images')
          .getPublicUrl(fileName);
        return publicUrlData.publicUrl;
      });

      try {
        galleryUrls.push(...await Promise.all(uploadPromises));
      } catch (err) {
        setError(err.message);
        setUploading(false);
        return;
      }
    }

    // New: Upload teacher images and prepare JSON
    const teachersData = [];
    if (teachers.length > 0) {
      const uploadPromises = teachers.map(async (teacher, index) => {
        let teacherImageUrl = null;
        if (teacher.image) {
          const fileExt = teacher.image.name.split('.').pop().toLowerCase();
          if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
            throw new Error(`Teacher ${index + 1} image must be a JPG, JPEG, PNG, or GIF.`);
          }
          const fileName = `teacher_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('retreat-images')
            .upload(fileName, teacher.image, { upsert: false });

          if (uploadError) {
            throw new Error(`Teacher ${index + 1} image upload error: ${uploadError.message}`);
          }

          const { data: publicUrlData } = supabase.storage
            .from('retreat-images')
            .getPublicUrl(fileName);
          teacherImageUrl = publicUrlData.publicUrl;
        }
        return {
          name: teacher.name,
          title: teacher.title,
          description: teacher.description,
          focus_areas: teacher.focus_areas,
          image_url: teacherImageUrl,
        };
      });

      try {
        teachersData.push(...await Promise.all(uploadPromises));
      } catch (err) {
        setError(err.message);
        setUploading(false);
        return;
      }
    }

    // New: Prepare FAQs JSON (no uploads needed)
    const faqsData = faqs.map(cat => ({
      category: cat.category,
      faqs: cat.faqs.map(q => ({ question: q.question, answer: q.answer })),
    }));

    // Insert into Supabase with new fields
    const { error: insertError } = await supabase.from('retreats').insert({
      title,
      date,
      location,
      description,
      schedule,
      image_url: imageUrl,
      included,
      gallery_images: galleryUrls,
      teachers: teachersData, // New
      faqs: faqsData, // New
    });

    if (insertError) {
      setError(`Insert error: ${insertError.message}`);
    } else {
      setSuccess(true);
      handleReset();
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
    setIncluded('');
    setImage(null);
    setGallery([]);
    setImagePreview(null);
    setGalleryPreviews([]);
    // New resets
    setTeachers([]);
    setFaqs([]);
    setError('');
    setSuccess(false);
    if (dateInputRef.current) dateInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGallery(files);
    setGalleryPreviews(files.map(file => URL.createObjectURL(file)));
  };

  // New: Teacher handlers
  const addTeacher = () => {
    setTeachers([...teachers, { name: '', title: '', description: '', focus_areas: '', image: null, preview: null }]);
  };

  const removeTeacher = (index) => {
    const newTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(newTeachers);
  };

  const updateTeacher = (index, field, value) => {
    const newTeachers = [...teachers];
    newTeachers[index][field] = value;
    setTeachers(newTeachers);
  };

  const handleTeacherImageChange = (index, e) => {
    const file = e.target.files?.[0] || null;
    const newTeachers = [...teachers];
    newTeachers[index].image = file;
    newTeachers[index].preview = file ? URL.createObjectURL(file) : null;
    setTeachers(newTeachers);
  };

  // New: FAQ handlers
  const addFaqCategory = () => {
    setFaqs([...faqs, { category: '', faqs: [] }]);
  };

  const removeFaqCategory = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const updateFaqCategory = (index, value) => {
    const newFaqs = [...faqs];
    newFaqs[index].category = value;
    setFaqs(newFaqs);
  };

  const addFaqToCategory = (catIndex) => {
    const newFaqs = [...faqs];
    newFaqs[catIndex].faqs.push({ question: '', answer: '' });
    setFaqs(newFaqs);
  };

  const removeFaqFromCategory = (catIndex, faqIndex) => {
    const newFaqs = [...faqs];
    newFaqs[catIndex].faqs = newFaqs[catIndex].faqs.filter((_, i) => i !== faqIndex);
    setFaqs(newFaqs);
  };

  const updateFaqInCategory = (catIndex, faqIndex, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[catIndex].faqs[faqIndex][field] = value;
    setFaqs(newFaqs);
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
          {/* Existing fields remain unchanged */}
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
            <label htmlFor="included" className="block text-lg font-medium text-gray-700">
              What&apos;s Included
            </label>
            <textarea
              id="included"
              value={included}
              onChange={(e) => setIncluded(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              rows={4}
              placeholder="e.g., Accommodation, Meals, Yoga Classes..."
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">
              Upload Main Image (optional)
            </label>
            <input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Main image preview" className="max-w-xs h-auto rounded-lg shadow-md" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="gallery" className="block text-lg font-medium text-gray-700">
              Upload Gallery Images (optional, multiple allowed)
            </label>
            <input
              id="gallery"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              multiple
              ref={galleryInputRef}
              onChange={handleGalleryChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {galleryPreviews.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">{galleryPreviews.length} image{galleryPreviews.length > 1 ? 's' : ''} selected:</p>
                <div className="grid grid-cols-3 gap-4">
                  {galleryPreviews.map((url, index) => (
                    <img key={index} src={url} alt={`Gallery preview ${index + 1}`} className="max-w-full h-auto rounded-lg shadow-md" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* New: Teachers section */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Teachers (optional)
            </label>
            {teachers.map((teacher, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg space-y-2">
                <input
                  type="text"
                  value={teacher.name}
                  onChange={(e) => updateTeacher(index, 'name', e.target.value)}
                  placeholder="Teacher Name e.g., Devesh"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={teacher.title}
                  onChange={(e) => updateTeacher(index, 'title', e.target.value)}
                  placeholder="Title e.g., Yoga Teacher"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  value={teacher.description}
                  onChange={(e) => updateTeacher(index, 'description', e.target.value)}
                  placeholder="Description e.g., Devesh blends ancient yoga traditions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
                <input
                  type="text"
                  value={teacher.focus_areas}
                  onChange={(e) => updateTeacher(index, 'focus_areas', e.target.value)}
                  placeholder="Focus Areas e.g., Yoga, Sound Healing, Meditation, Ayurveda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => handleTeacherImageChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700"
                />
                {teacher.preview && (
                  <img src={teacher.preview} alt={`Teacher ${index + 1} preview`} className="max-w-xs h-auto rounded-lg shadow-md" />
                )}
                <button
                  type="button"
                  onClick={() => removeTeacher(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove Teacher
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTeacher}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add Teacher
            </button>
          </div>

          {/* New: FAQs section */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              FAQs (optional)
            </label>
            {faqs.map((cat, catIndex) => (
              <div key={catIndex} className="mb-4 p-4 border border-gray-300 rounded-lg space-y-2">
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateFaqCategory(catIndex, e.target.value)}
                  placeholder="Category e.g., General Retreat Information"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {cat.faqs.map((q, faqIndex) => (
                  <div key={faqIndex} className="pl-4 space-y-2">
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateFaqInCategory(catIndex, faqIndex, 'question', e.target.value)}
                      placeholder="Question e.g., Who can attend a retreat?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={q.answer}
                      onChange={(e) => updateFaqInCategory(catIndex, faqIndex, 'answer', e.target.value)}
                      placeholder="Answer e.g., Anyone over 18..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => removeFaqFromCategory(catIndex, faqIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove FAQ
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFaqToCategory(catIndex)}
                  className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
                >
                  Add FAQ to Category
                </button>
                <button
                  type="button"
                  onClick={() => removeFaqCategory(catIndex)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Remove Category
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaqCategory}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add FAQ Category
            </button>
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