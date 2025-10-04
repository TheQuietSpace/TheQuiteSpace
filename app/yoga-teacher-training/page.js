"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function RetreatDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("teachers");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [filterRating, setFilterRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wellnessProgram, setWellnessProgram] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [destination, setDestination] = useState("");
  const [numPersons, setNumPersons] = useState("");
  const [agreed, setAgreed] = useState(false);

  const mainPlaceholder =
    "https://via.placeholder.com/800x500?text=Main+Image+Not+Found";
  const teacherPlaceholder =
    "https://via.placeholder.com/150x150?text=Teacher+Image+Not+Found";

  // Static retreat data
  const retreat = {
    id: 1,
    title: "Yin Yoga Teacher Training Course",
    description:
      "Discover the transformative practice of Yin Yoga on the serene island of Mauritius with The Quiet Space. Surrounded by pristine beaches and lush tropical beauty, this 50-hour Yin Yoga Teacher Training Course (TTC) is designed to guide you into the subtle art of stillness, awareness, and deep tissue release.\n\nUnlike dynamic styles of yoga, Yin works gently yet profoundly on the fascia, joints, and connective tissues, creating balance and harmony within body and mind. Whether you are a dedicated practitioner or a yoga teacher seeking to expand your skills, this training offers the perfect blend.",
    price: 15000,
    image_url: "/hero.svg",
    gallery_images: ["/hero.svg", "/hero.svg", "/hero.svg"],
    location: ["The Quiet Space, Mauritius"],
    schedule:
      "Training details\nLocation: The Quiet Space, Mauritius\nDuration: 6 Days Intensive (with optional extended practice)\nCertification: 50Hr YACEP (Yoga Alliance Continuing Education)",
    teachers: [
      {
        name: "Sarah Johnson",
        title: "Lead Yin Yoga Instructor",
        description:
          "With over 15 years of experience in Yin Yoga and deep tissue work, Sarah brings profound knowledge of fascia, joints, and connective tissue healing.",
        focus_areas: "Yin Yoga, Deep Tissue Release, Fascia Work, Meditation",
        image_url: null,
      },
    ],
    faqs: [
      {
        category: "Training Questions",
        faqs: [
          {
            question: "What is included in the 50-hour training?",
            answer:
              "Complete Yin Yoga methodology, anatomy of fascia and connective tissues, meditation practices, and teaching techniques.",
          },
          {
            question: "Is this suitable for beginners?",
            answer:
              "This training is designed for both dedicated practitioners and existing yoga teachers looking to expand their skills.",
          },
          {
            question: "What certification will I receive?",
            answer:
              "You will receive a 50Hr YACEP (Yoga Alliance Continuing Education) certification upon completion.",
          },
        ],
      },
    ],
  };

  // Static reviews data
  const reviews = [
    {
      id: 1,
      user_name: "John Doe",
      rating: 5,
      review: "Amazing experience! Truly transformative.",
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      user_name: "Jane Smith",
      rating: 4,
      review: "Great retreat with wonderful instructors.",
      created_at: "2024-01-10T14:30:00Z",
    },
  ];

  const wellnessPrograms = [
    "Yoga Retreat",
    "Meditation Program",
    "Detox Program",
  ];
  const accommodationOptions = [
    "Single",
    "Double",
    "Triple",
    "Non Residential",
    "Online",
  ];
  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "Germany",
    "France",
    "Other",
  ];
  const numberOfPersons = Array.from({ length: 10 }, (_, i) => i + 1);

  const destinations = Array.isArray(retreat.location)
    ? retreat.location
    : [retreat.location];

  const handleBookAndPay = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !wellnessProgram ||
      !accommodation ||
      !date ||
      !country ||
      !destination ||
      !numPersons ||
      !agreed
    ) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }

    // Static frontend - just show success message
    alert("Booking form submitted! (This is a static demo)");
    setShowBookingForm(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmitReview = () => {
    if (!newReview) {
      alert("Please provide a review.");
      return;
    }

    // Static frontend - just show success message
    alert("Review submitted! (This is a static demo)");
    setShowForm(false);
    setNewRating(5);
    setNewReview("");
  };

  useEffect(() => {
    document.body.style.background = "#ffffff";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const allImages = [
    ...(retreat.image_url ? [retreat.image_url] : []),
    ...(retreat.gallery_images || []),
  ].filter((url) => typeof url === "string" && url.length > 0);

  const handlePrevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  const handleNextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );

  const includedItems = [
    { iconFile: "images 2.png", label: "7 days of Yoga" },
    { iconFile: "download 4.png", label: "Organic meals" },
    {
      iconFile: "triangle-sacred-icon-in-line-art-vector 1.png",
      label: "Sacred location",
    },
    { iconFile: "download 2.png", label: "Free Workshop" },
    { iconFile: "download 3.png", label: "Nature walk" },
  ];

  const scheduleItems = retreat.schedule
    ? typeof retreat.schedule === "string"
      ? retreat.schedule.split("\n").filter((i) => i.trim())
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
    <div className="bg-white min-h-screen">
      <section className="h-screen sm:h-[70vh] lg:h-[80vh] w-full overflow-hidden relative -mt-20 sm:-mt-16 md:-mt-20 lg:-mt-24">
        <div className="absolute inset-0">
          <Image
            src="/Frame 1410119540(1).png"
            alt="Hero background"
            fill={true}
            className="object-cover object-center"
            unoptimized={true}
            priority={true}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 mt-30 flex items-center justify-center px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="prose prose-base sm:prose-lg text-white/90 leading-relaxed">
              <h2 className="text-3xl font-semibold text-black mb-6 sm:mb-8 leading-tight">
                50- Hours Yin Yoga Teacher Training in Mauritius
              </h2>
              <p className="mb-3 sm:mb-4 text-2xl text-black font-light">
                Deepen your practice. Expand your teaching. Transform in
                paradise
              </p>
              <h2 className="text-xl font-semibold text-black mb-6 sm:mb-8 leading-tight">
                50 Hours | Yoga Alliance Certified
              </h2>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white md:mt-24 mt-20">
        <div className="max-w-screen-xl mx-auto px-0 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:h-[700px]">
            <div className="space-y-3 sm:space-y-4 flex flex-col h-full lg:h-[700px]">
              <div className="relative w-full flex-1 rounded-xl overflow-hidden shadow-lg bg-gray-200">
                <Image
                  key={currentImageIndex}
                  src="/Frame 1410119543.png"
                  alt={`${retreat.title} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                  onError={(e) => (e.currentTarget.src = mainPlaceholder)}
                  priority={currentImageIndex === 0}
                  unoptimized={true}
                />
              </div>
            </div>
            <div className="flex flex-col h-full lg:h-[700px]">
              <div className="bg-white overflow-hidden flex-1">
                <div className="space-y-4 sm:space-y-6 p-4">
                  <div>
                    <div className="text-gray-700 text-lg leading-relaxed">
                      <p className="mb-3">
                        Discover the transformative practice of Yin Yoga on the
                        serene island of Mauritius with The Quiet Space.
                      </p>
                      <p className="mb-3">
                        Surrounded by pristine beaches and lush tropical beauty,
                        this 50-hour Yin Yoga Teacher Training Course (TTC) is
                        designed to guide you into the subtle art of stillness,
                        awareness, and deep tissue release.
                      </p>
                      <p className="mb-3">
                        Unlike dynamic styles of yoga, Yin works gently yet
                        profoundly on the fascia, joints, and connective
                        tissues, creating balance and harmony within body and
                        mind.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      Training Details
                    </h2>
                    <div className="space-y-2 text-lg text-gray-700">
                      <div>
                        <span className="font-semibold">Location:</span> The
                        Quiet Space, Mauritius
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> 6 Days
                        Intensive (with optional extended practice)
                      </div>
                      <div>
                        <span className="font-semibold">Certification:</span>{" "}
                        50Hr YACEP (Yoga Alliance Continuing Education)
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-[#c8a961] hover:bg-[#b88c4e] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="rounded-lg max-w-screen bg-[#faf8f5] mt-8">
            <div className="max-w-screen mx-auto px-4 sm:px-6">
              <div className="relative rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-8 px-4 sm:px-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Why Yin Yoga Teacher Training at The Quiet Space?
                    </h3>
                    <ul className="list-inside space-y-3 text-gray-700">
                      <li>
                        ✔ Learn the art of stillness, alignment & mindfulness
                      </li>
                      <li>
                        ✔ Yoga Alliance accredited 50 Hr TTC – teach worldwide
                      </li>
                      <li>✔ Practice in the serene beauty of Mauritius</li>
                      <li>✔ Guided by experienced international teachers</li>
                      <li>✔ Small group training for personal attention</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image
                        src="/Group 4285.png"
                        alt="Lotus vector"
                        width={192}
                        height={192}
                        className="object-contain"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Title */}
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  Course Highlights
                </h2>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
                {[
                  {
                    name: "Devesh",
                    role: "Yin Philosophy & Foundations",
                    src: "/new1.png", // Replace with actual image path for Devesh
                    alt: "Devesh - Founder and lead teacher",
                  },
                  {
                    name: "Jane Doe",
                    role: "Archetypal Yin Postures & Variations",
                    src: "/new1.png", // Replace with actual image path for Jane
                    alt: "Jane Doe - Senior Yoga Instructor",
                  },
                  {
                    name: "John Smith",
                    role: "Meridian, Anatomy & Fascia Science",
                    src: "/new1.png", // Replace with actual image path for John
                    alt: "John Smith - Meditation Guide",
                  },
                  {
                    name: "Alice Johnson",
                    role: "Subtle Energy: Koshas, Prana & Nadis",
                    src: "/new1.png", // Replace with actual image path for Alice
                    alt: "Alice Johnson - Wellness Facilitator",
                  },
                  {
                    name: "Alice Johnson",
                    role: "Teaching Methodology & Sequencing",
                    src: "/new1.png", // Replace with actual image path for Alice
                    alt: "Alice Johnson - Wellness Facilitator",
                  },
                ].map((facilitator, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 sm:mb-6 mx-auto">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={facilitator.src}
                          alt={facilitator.alt}
                          width={256} // Match lg:w-64
                          height={256} // Match lg:h-64
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                      {facilitator.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="rounded-lg max-w-screen bg-[#faf8f5] mt-8">
            <div className="max-w-screen mx-auto px-4 sm:px-6">
              <div className="relative rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-8 px-4 sm:px-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      What You&apos;ll Take Home
                    </h3>
                    <ul className="list-inside space-y-3 text-gray-700">
                      <li>✔ Confidence to lead Yin Yoga classes</li>
                      <li>✔ A deep personal Yin practice</li>
                      <li>✔ Tools to balance body, mind & energy</li>
                      <li>✔ Globally recognized certification</li>
                      <li>✔ A transformative experience in paradise</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image
                        src="/Group 4285.png"
                        alt="Lotus vector"
                        width={192}
                        height={192}
                        className="object-contain"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-10 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8">
              {/* What's Included */}
              <div className="bg-[#faf8f5] p-8 shadow-none flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  What&apos;s Included
                </h2>
                <ul className="w-full space-y-6">
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/ion_bed-outline.png"
                        alt="Bed Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Comfortable stay in serene surroundings
                    </span>
                  </li>
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/healthicons_hot-meal-outline-24px.png"
                        alt="Food Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Nourishing vegetarian/vegan meals
                    </span>
                  </li>
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/hugeicons_yoga-02.png"
                        alt="Yoga Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Daily yoga, meditation & mindfulness
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/famicons_book-outline.png"
                        alt="Book Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Guided workshops & reflective practices
                    </span>
                  </li>
                </ul>
              </div>
              {/* What's Not Included */}
              <div className="bg-[#faf8f5] p-8 shadow-none flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  What&apos;s Not Included
                </h2>
                <ul className="w-full space-y-6">
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/mynaui_aeroplane.png"
                        alt="Airplane Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Airfare / travel to retreat location
                    </span>
                  </li>
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/solar_walking-bold.png"
                        alt="Excursion Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Optional excursions
                    </span>
                  </li>
                  <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/streamline_travel-places-hot-spring-relax-location-outdoor-recreation-spa.png"
                        alt="Spa Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Personal spa treatments or therapies
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-8 h-8">
                      <img
                        src="/mynaui_shopping-bag.png"
                        alt="Shopping Icon"
                        className="w-8 h-8"
                      />
                    </span>
                    <span className="text-lg text-gray-800">
                      Personal expenses & shopping
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="max-w-screen-xl mx-auto mt-4 px-4 sm:px-6">
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-3xl text-center font-semibold text-gray-900 mb-8">
                Why Choose the quiet space ?
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm sm:text-base">
                <li>
                  Expert international facilitators with decades of experience
                  in healing and yoga.
                </li>
                <li>
                  A <strong>tailor-made program</strong> designed around your
                  individual needs.
                </li>
                <li>
                  A unique combination of{" "}
                  <strong>
                    mindfulness, therapeutic practices, and island healing
                    energy
                  </strong>
                  .
                </li>
                <li>
                  Small-group setting for intimacy, attention, and personal
                  growth.
                </li>
              </ul>
              <p className="mt-4 text-gray-700 text-sm sm:text-base">
                This isn&apos;t just a retreat—it&apos;s an{" "}
                <strong>awakening of your inner light.</strong>
              </p>
            </div>
          </section>
          <section className="max-w-screen-xl rounded-lg mb-6 bg-[#faf8f5] mx-auto mt-8 px-4 sm:px-6">
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 text-center">
                Cancellation Policy
              </h3>

              <p className="text-gray-700 text-sm sm:text-base mb-4">
                At <strong>The Quiet Space</strong>, every retreat is prepared
                with great care and love. Because our retreat spaces are
                extremely limited, each booking is significant. For this reason,
                we follow a <strong>non-refundable policy</strong> on all
                reservations.
              </p>

              <p className="text-gray-700 text-sm sm:text-base mb-6">
                We kindly ask you to confirm your plans before securing your
                place, as once registered, your booking is considered final.
                This allows us to maintain the quality and exclusivity of the
                retreat experience for all participants.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Important Notes
              </h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-6 text-sm sm:text-base">
                <li>
                  <strong>All bookings are non-refundable</strong>, regardless
                  of the reason for cancellation.
                  <div className="mt-2 ml-4 space-y-1 text-gray-700">
                    <div>
                      a. <strong>Transfer your booking</strong> to another
                      person (a friend, family member, or colleague).
                    </div>
                    <div>
                      b. <strong>Request a date change</strong> (subject to
                      availability and retreat schedule).
                    </div>
                  </div>
                </li>
                <li>
                  In rare cases of <strong>force majeure</strong> (natural
                  disasters, government restrictions, or unforeseen events
                  beyond our control), The Quiet Space reserves the right to
                  reschedule or provide an alternative option.
                </li>
              </ol>

              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Force Majeure
              </h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                <li>
                  The Quiet Space reserves the right to modify or cancel
                  bookings in the event of unforeseen circumstances or force
                  majeure situations that are beyond our control.
                </li>
                <li>
                  In such cases, guests will be notified promptly, and
                  alternative options or a refund will be provided at our
                  discretion.
                </li>
              </ol>
            </div>
          </section>
          {/* Rest of sections... */}

          <button
            onClick={() => setShowBookingForm(true)}
            className="w-full max-w-screen-xl mb-12 mx-auto block bg-[#c8a961] hover:bg-[#b88c4e] text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/30 backdrop-blur-md">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xl space-y-4 sm:space-y-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Book Your Spot
              </h3>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input type="radio" checked readOnly className="mr-2" />
                Retreat
              </label>
              <label className="flex items-center">
                <input type="radio" disabled className="mr-2" />
                Workshop
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Wellness Program
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={wellnessProgram}
                  onChange={(e) => setWellnessProgram(e.target.value)}
                >
                  <option value="">Select</option>
                  {wellnessPrograms.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Destination
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Accommodation Options
              </label>
              <div className="flex flex-wrap gap-4">
                {accommodationOptions.map((opt) => (
                  <label key={opt} className="flex items-center">
                    <input
                      type="radio"
                      name="accommodation"
                      value={opt}
                      checked={accommodation === opt}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Number of Persons
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={numPersons}
                  onChange={(e) => setNumPersons(e.target.value)}
                >
                  <option value="">Select</option>
                  {numberOfPersons.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Country
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                value={`₹${
                  retreat.price ? retreat.price.toFixed(2) : "1000.00"
                } per person`}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100"
                disabled
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                I agree to the terms and conditions
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Please note that the prices listed are exclusive of applicable
              taxes (VAT)
            </p>
            <button
              onClick={handleBookAndPay}
              className="w-full bg-[#c1a050] hover:from-yellow-500 hover:to-yellow-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Proceed to Payment
            </button>
            <button
              onClick={() => setShowBookingForm(false)}
              className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
