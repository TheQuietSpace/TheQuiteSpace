'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabse';
import Image from 'next/image';

export default function RetreatDetails() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [retreat, setRetreat] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [activeTab, setActiveTab] = useState('teachers');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [user, setUser] = useState(null);
  const [filterRating, setFilterRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const mainPlaceholder = 'https://via.placeholder.com/800x500?text=Main+Image+Not+Found';
  const teacherPlaceholder = 'https://via.placeholder.com/150x150?text=Teacher+Image+Not+Found';

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        const { data: retreatData, error: retreatError } = await supabase
          .from('retreats')
          .select('*')
          .eq('id', id)
          .single();
        if (retreatError) throw retreatError;
        if (!retreatData) throw new Error('Retreat not found');

        let gallery = [];
        if (Array.isArray(retreatData.gallery_images)) {
          gallery = retreatData.gallery_images;
        } else if (typeof retreatData.gallery_images === 'string') {
          try {
            gallery = JSON.parse(retreatData.gallery_images);
          } catch {
            gallery = retreatData.gallery_images.split(',').map((u) => u.trim());
          }
        }
        gallery = gallery.filter((url) => typeof url === 'string' && url.startsWith('http'));

        let teachers = [];
        if (Array.isArray(retreatData.teachers)) {
          teachers = retreatData.teachers.map(teacher => ({
            ...teacher,
            image_url: teacher.image_url?.startsWith('http') ? teacher.image_url : null,
          }));
        }

        let faqs = [];
        if (Array.isArray(retreatData.faqs)) {
          faqs = retreatData.faqs.map(cat => ({
            category: cat.category,
            faqs: Array.isArray(cat.faqs) ? cat.faqs : [],
          }));
        }

        setRetreat({
          ...retreatData,
          image_url: retreatData.image_url?.startsWith('http') ? retreatData.image_url : null,
          gallery_images: gallery,
          teachers,
          faqs,
        });

        await fetchReviews();
      } catch (error) {
        console.error('Error fetching data:', error);
        setImageError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('id, user_name, rating, review, created_at')
          .eq('retreat_id', id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) {
      alert('Please sign in to submit a review.');
      router.push('/auth');
      return;
    }
    if (!newReview) {
      alert('Please provide a review.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          retreat_id: id,
          user_id: user.id,
          user_name: user.user_metadata?.name || user.email.split('@')[0],
          rating: newRating,
          review: newReview,
        })
        .select('id, user_name, rating, review, created_at')
        .single();
      if (error) throw error;
      setReviews([data, ...reviews]);
      setShowForm(false);
      setNewRating(5);
      setNewReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleBookAndPay = async () => {
    if (!name || !email || !phone) {
      alert('Please fill all fields');
      return;
    }

    try {
      const price = retreat.price || 1000;

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          retreat_id: id,
          user_name: name,
          email,
          phone,
          payment_status: 'pending',
          amount: price,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert('Failed to load payment gateway. Are you online?');
        return;
      }

      const orderRes = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price * 100,
          currency: 'INR',
          receipt: booking.id.toString(),
        }),
      });

      const order = await orderRes.json();
      if (order.error) {
        throw new Error(order.error);
      }

      const options = {
        key: 'rzp_test_cxGOOUFzSyzr48', // Your Razorpay Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Retreat Booking',
        description: `Booking for ${retreat.title}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/verify-razorpay-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert('Payment successful! Your booking is confirmed.');
              setShowBookingForm(false);
              setName('');
              setEmail('');
              setPhone('');
            } else {
              alert('Payment verification failed.');
              await supabase.from('bookings').update({ payment_status: 'failed' }).eq('id', booking.id);
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Error verifying payment.');
            await supabase.from('bookings').update({ payment_status: 'failed' }).eq('id', booking.id);
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async () => {
        alert('Payment failed');
        await supabase.from('bookings').update({ payment_status: 'failed' }).eq('id', booking.id);
      });
      rzp.open();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to initiate booking and payment.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading retreat details...</p>
        </div>
      </div>
    );
  }

  if (!retreat) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Retreat Not Found</h2>
          <p className="text-sm sm:text-base">The retreat you are looking for doesn not exist.</p>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(retreat.image_url ? [retreat.image_url] : []),
    ...(retreat.gallery_images || []),
  ].filter((url) => typeof url === 'string' && url.length > 0);

  const mainImageUrl = allImages[0];

  const handlePrevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const includedItems = retreat.included
    ? retreat.included
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item)
        .map((item) => {
          const icons = {
            yoga: '🧘',
            meal: '🥗',
            meals: '🥗',
            location: '🗺️',
            workshop: '📚',
            walk: '🌳',
            nature: '🌳',
            meditation: '🧘‍♀️',
            retreat: '🏞️',
            session: '🧘',
            default: '✨',
          };
          let key = 'default';
          for (const k of Object.keys(icons)) {
            if (k !== 'default' && item.toLowerCase().includes(k)) {
              key = k;
              break;
            }
          }
          return { icon: icons[key], label: item };
        })
        .slice(0, 5)
    : [];

  const scheduleItems = retreat.schedule
    ? typeof retreat.schedule === 'string'
      ? retreat.schedule.split('\n').filter((i) => i.trim())
      : Array.isArray(retreat.schedule)
      ? retreat.schedule.filter((i) => i.trim())
      : []
    : [];

  const toggleFaq = (categoryIndex, faqIndex) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [`${categoryIndex}-${faqIndex}`]: !prev[`${categoryIndex}-${faqIndex}`],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
  {/* breadcrumb moved into image container (top-right) */}

      <div className="max-w-7xl mx-4 sm:mx-6 lg:mx-10 px-2 sm:px-4 py-4 sm:py-6">
        {imageError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium text-sm sm:text-base">
            {imageError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="mb-2">
              <div className="text-sm text-gray-600">
                Retreat &gt; {retreat.title || 'The Quiet Space'}
              </div>
            </div>
            <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-200">
              <Image
                key={currentImageIndex}
                src={allImages[currentImageIndex] || mainPlaceholder}
                alt={`${retreat.title} - Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 500px"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                onError={(e) => (e.currentTarget.src = mainPlaceholder)}
                priority={currentImageIndex === 0}
                unoptimized={true}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-all z-10"
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-all z-10"
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex space-x-2 sm:space-x-4 overflow-x-auto">
                {allImages.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-200 cursor-pointer ring-2 ring-transparent hover:ring-yellow-400 transition-all flex-shrink-0"
                    onClick={() => setCurrentImageIndex(idx + 1)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      style={{ objectFit: 'cover' }}
                      className="rounded-xl"
                      onError={(e) => (e.currentTarget.src = mainPlaceholder)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <div className="text-sm text-gray-600 invisible">
                Retreat &gt; {retreat.title || 'The Quiet Space'}
              </div>
            </div>
            <div className="bg-white overflow-y-auto h-[calc(14rem+0.75rem+3.5rem)] sm:h-[calc(18rem+1rem+4rem)] md:h-[calc(24rem+1rem+4rem)] lg:h-[calc(500px+1rem+4rem)]">
              <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Description</h2>
              <div className="text-gray-600 text-sm leading-relaxed">
                {retreat.description
                  ? retreat.description.split('\n').map((p, idx) => (
                      <p key={idx} className="mb-2">{p.trim() || <br />}</p>
                    ))
                  : <p>No description available.</p>}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">What is Included</h2>
              {includedItems.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {includedItems.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center w-16 sm:w-20">
                      <div className="bg-gray-50 border border-gray-200 rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <span className="text-lg sm:text-xl">{item.icon}</span>
                      </div>
                      <p className="text-xs text-gray-700 font-medium mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">What is included information will be available soon.</p>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Price</h2>
              <p className="text-gray-600 text-sm">
                ₹{retreat.price ? retreat.price.toFixed(2) : '1000.00'} per person
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Schedule</h2>
              {scheduleItems.length > 0 ? (
                <div className="space-y-1">
                  {scheduleItems.map((item, idx) => (
                    <p key={idx} className="text-gray-600 text-sm sm:text-base">{item.trim()}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">Day 1 — Arrival & Orientation</p>
                  <p className="text-gray-600 text-sm">Day 2 — Deepening Practice</p>
                  <p className="text-gray-600 text-sm">Day 3 — Immersion</p>
                </div>
              )}
            </div>
            <div className="pt-2">
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Book Your Spot
              </button>
            </div>
            {showBookingForm && (
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 space-y-3 sm:space-y-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Book Your Spot</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <div className="text-sm sm:text-base text-gray-600">
                  Total: ₹{retreat.price ? retreat.price.toFixed(2) : '1000.00'}
                </div>
                <button
                  onClick={handleBookAndPay}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Pay and Book
                </button>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="w-full bg-gray-200 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
          <div className="flex flex-row flex-nowrap border-b border-gray-200 mb-4 sm:mb-6 gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                activeTab === 'teachers'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Teacher Bios
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Ratings and Reviews
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                activeTab === 'faqs'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQs
            </button>
          </div>
          <div className="space-y-4 sm:space-y-6 flex flex-col self-stretch h-full overflow-y-auto pr-2">
            {activeTab === 'teachers' && (
              <div className="space-y-4">
                {retreat.teachers && retreat.teachers.length > 0 ? (
                  retreat.teachers.map((teacher, index) => (
                    <div
                      key={index}
                      className="flex bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="w-1/4 h-32 bg-gray-200 flex-shrink-0">
                        <Image
                          src={teacher.image_url || teacherPlaceholder}
                          alt={teacher.name}
                          width={120}
                          height={128}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.src = teacherPlaceholder)}
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{teacher.name}</h4>
                        <p className="text-sm text-yellow-600 font-medium mb-2">{teacher.title}</p>
                        <div className="flex text-yellow-400 mb-2 text-sm">
                          {'★'.repeat(4)}{'☆'.repeat(1)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">{teacher.description}</p>
                        <p className="text-sm text-gray-800">
                          <span className="font-medium">Focus areas:</span> {teacher.focus_areas}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-500 text-sm sm:text-base">No teachers available.</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
                    >
                      {showForm ? 'Cancel' : 'Add Review'}
                    </button>
                    <button
                      className="bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-2 font-semibold text-gray-900 flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                      onClick={() => setShowFilters((prev) => !prev)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2m-6 4v6m0 0l-2-2m2 2l2-2" />
                      </svg>
                      Filters
                    </button>
                  </div>
                </div>
                {showFilters && (
                  <div className="mb-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-4">
                    <label className="font-semibold text-gray-700">Filter by rating:</label>
                    <select
                      className="border border-gray-300 rounded-lg p-2 w-40"
                      value={filterRating || ''}
                      onChange={(e) => setFilterRating(Number(e.target.value))}
                    >
                      <option value="">All Ratings</option>
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                )}
                {showForm && (
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 space-y-3 sm:space-y-4">
                    {user ? (
                      <p className="text-gray-600 text-sm sm:text-base">
                        Reviewing as {user.user_metadata?.name || user.email.split('@')[0]}
                      </p>
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base">
                        Please <a href="/auth" className="text-yellow-600 hover:underline">sign in</a> to submit a review.
                      </p>
                    )}
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      disabled={!user}
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Your Review"
                      className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 sm:h-32"
                      disabled={!user}
                    />
                    <button
                      onClick={handleSubmitReview}
                      disabled={!user}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                      Submit Review
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {reviews.length > 0 ? (
                    reviews
                      .filter((rev) => !filterRating || rev.rating === filterRating)
                      .map((rev, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between min-h-[180px]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-500 text-base">
                              {[...Array(Math.floor(rev.rating))].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.174 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                                </svg>
                              ))}
                              {rev.rating % 1 !== 0 && (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <defs>
                                    <linearGradient id="half">
                                      <stop offset="50%" stopColor="#FBBF24" />
                                      <stop offset="50%" stopColor="#E5E7EB" />
                                    </linearGradient>
                                  </defs>
                                  <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.174 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"
                                    fill="url(#half)"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="font-semibold text-gray-900 ml-2">{rev.user_name}</span>
                            <span className="ml-1 text-green-600 text-lg" title="Verified">●</span>
                            <span className="ml-auto text-gray-400 cursor-pointer" title="More options">…</span>
                          </div>
                          <div className="text-gray-700 text-base mb-2">{rev.review}</div>
                          <div className="text-xs text-gray-500 mt-auto">
                            Posted on {new Date(rev.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-6 sm:py-8 col-span-2">
                      <p className="text-gray-500 text-sm sm:text-base">No reviews available yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'faqs' && (
              <div className="space-y-6 sm:space-y-8">
                {retreat.faqs && retreat.faqs.length > 0 ? (
                  retreat.faqs.map((category, catIndex) => (
                    <div key={catIndex}>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{category.category}</h4>
                      <div className="space-y-1">
                        {category.faqs.map((faq, faqIndex) => (
                          <div key={faqIndex} className="border-b border-gray-100 last:border-b-0">
                            <button
                              onClick={() => toggleFaq(catIndex, faqIndex)}
                              className="w-full text-left flex justify-between items-center py-3 sm:py-4 hover:bg-gray-50 px-2 rounded transition-colors"
                            >
                              <span className="text-sm sm:text-base text-gray-700 font-medium pr-4">{faq.question}</span>
                              <span className="text-gray-400 flex-shrink-0">
                                {expandedFaqs[`${catIndex}-${faqIndex}`] ? (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </span>
                            </button>
                            {expandedFaqs[`${catIndex}-${faqIndex}`] && (
                              <div className="pb-3 sm:pb-4 px-2">
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                  {faq.answer || 'Answer not provided.'}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-500 text-sm sm:text-base">No FAQs available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}