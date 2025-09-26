'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { supabase } from '@/lib/supabse';

const AboutSections = () => {
  const [blogs, setBlogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
  const [currentPageArticles, setCurrentPageArticles] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  // Dummy testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Lorri Warf",
      role: "UX Designer",
      image: "/Frame 4316.png",
      testimonial: "Professional Partner - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
    {
      id: 2,
      name: "David Elson",
      role: "Developer",
      image: "/Frame 4316.png",
      testimonial: "Incredible Experience - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
    {
      id: 3,
      name: "Ricky Smith",
      role: "Developer",
      image: "/Frame 4316.png",
      testimonial: "Dependable & Responsive - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
     {
      id: 4,
      name: "Lorri Warf",
      role: "UX Designer",
      image: "/Frame 4316.png",
      testimonial: "Professional Partner - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
     {
      id: 5,
      name: "Lorri Warf",
      role: "UX Designer",
      image: "/Frame 4316.png",
      testimonial: "Professional Partner - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
     {
      id: 6,
      name: "Lorri Warf",
      role: "UX Designer",
      image: "/Frame 4316.png",
      testimonial: "Professional Partner - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor non sit sed magna pharetra in amet porta enim.",
      rating: 5
    },
  ];

  // Fetch blogs and articles
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [blogsData, articlesData] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
      ]);
      if (blogsData.error) console.error('Fetch blogs error:', blogsData.error.message);
      else setBlogs(blogsData.data || []);
      if (articlesData.error) console.error('Fetch articles error:', articlesData.error.message);
      else setArticles(articlesData.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Function to calculate time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date('2025-09-24T12:27:00+05:30'); // 01:27 PM IST, September 24, 2025
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInMinutes > 0) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
  };

  // Handle opening modal
  const handleReadMore = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Pagination for blogs
  const totalPagesBlogs = Math.ceil(blogs.length / itemsPerPage);
  const paginatedBlogs = blogs.slice((currentPageBlogs - 1) * itemsPerPage, currentPageBlogs * itemsPerPage);

  // Pagination for articles
  const totalPagesArticles = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice((currentPageArticles - 1) * itemsPerPage, currentPageArticles * itemsPerPage);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-700">Loading amazing content...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full  bg-white">
      {/* Enhanced Hero Section */}
      <section className=" h-[60vh] sm:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-150 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(181, 155, 76, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url('/Frame 1410119435.png')`,
            }}
          />
        </div>
    
      </section>

      {/* Enhanced Blogs Section */}
      <section className="w-full py-16 sm:py-24 mt-25  bg-gradient-to-br from-gray-50 to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-amber-600">Blogs</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Dive into our collection of thoughtful reflections and practical insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {paginatedBlogs.map((blog, index) => (
              <div key={blog.id} className={`group transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8'}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="flex flex-col sm:flex-row">
                    {/* Enhanced Content Side */}
                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between order-2 sm:order-1">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                            {timeAgo(blog.created_at)}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed line-clamp-4 mb-6">
                          {blog.content}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          className="group/btn inline-flex items-center space-x-3 text-amber-600 hover:text-amber-700 font-semibold transition-all duration-300"
                          onClick={() => handleReadMore(blog)}
                        >
                          <span className="text-lg">Continue Reading</span>
                          <div className="w-10 h-10 rounded-full bg-amber-100 group-hover/btn:bg-amber-200 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                            <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Image Side */}
                    <div className="w-full sm:w-64 h-64 sm:h-auto relative order-1 sm:order-2 overflow-hidden">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Pagination for Blogs */}
          {totalPagesBlogs > 1 && (
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-4 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                <button
                  onClick={() => setCurrentPageBlogs((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPageBlogs === 1}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-700"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPagesBlogs }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPageBlogs(page)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                        currentPageBlogs === page
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPageBlogs((prev) => Math.min(prev + 1, totalPagesBlogs))}
                  disabled={currentPageBlogs === totalPagesBlogs}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Whispers from the Journey Section */}
      <section className="w-full py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent"></div>
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 px-4 sm:px-6 lg:px-8">
            {/* Enhanced Images Grid */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full max-w-lg lg:max-w-xl">
              {[
                "/full-shot-women-meditating-nature.jpg", 
                "/participants-practice-yoga-sunrise-tranquil-studio-surrounded-by-nature-panoramic-views.jpg", 
                "/interior-design-yoga-space.jpg", 
                "/serene-yoga-retreat-with-practitioners-gracefully-engaged-poses-amidst-tranquil-surroundings-finding-peace-balance-ai-generative-ai.jpg"
              ].map((src, idx) => (
                <div key={idx} className={`group relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 aspect-square transform hover:scale-105 transition-all duration-700 ${idx % 2 === 0 ? '' : 'mt-8'}`}>
                  <Image 
                    src={src} 
                    alt="Journey" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Text Content */}
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-2xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 font-semibold rounded-full text-sm uppercase tracking-wide">
                  Monthly Reflections
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Whispers from the <span className="text-amber-600">Journey</span>
              </h2>
              <p className="text-gray-700 text-lg sm:text-xl mb-10 leading-relaxed">
                Each month, we pause to gather the quiet moments, the lessons from our journeys, and the whispers of stillness carried back from retreat. These reflections and travel diaries are an offering of wisdom and wonder.
              </p>
              <button
                className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                onClick={() => {
                  const el = document.getElementById('featured-articles');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Explore Stories</span>
                <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Articles Section */}
  <section id="featured-articles" className="w-full py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Featured <span className="text-amber-400">Articles</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
              In-depth explorations of mindfulness, wellness, and transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {paginatedArticles.map((article, index) => (
              <div key={article.id} className={`group transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8'}`}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 border border-gray-700/50 hover:border-amber-500/30">
                  <div className="flex flex-col sm:flex-row">
                    {/* Enhanced Image Side */}
                    <div className="w-full sm:w-48 h-64 sm:h-64 relative flex-shrink-0 overflow-hidden">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                    </div>
                    
                    {/* Enhanced Content Side */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                          <span className="text-sm font-medium text-amber-400 uppercase tracking-wide">
                            {timeAgo(article.created_at)}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6">
                          {article.content}
                        </p>
                      </div>
                      
                      {/* Enhanced Read More Button */}
                      <div className="flex justify-end">
                        <button
                          className="group/btn inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-semibold transition-all duration-300"
                          onClick={() => handleReadMore(article)}
                        >
                          <span>Read Article</span>
                          <div className="w-8 h-8 rounded-full bg-amber-400/10 group-hover/btn:bg-amber-400/20 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Pagination for Articles */}
          {totalPagesArticles > 1 && (
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
                <button
                  onClick={() => setCurrentPageArticles((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPageArticles === 1}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700/50 text-gray-300"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPagesArticles }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPageArticles(page)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                        currentPageArticles === page
                          ? 'bg-amber-500 text-white shadow-lg'
                          : 'text-gray-400 hover:bg-gray-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPageArticles((prev) => Math.min(prev + 1, totalPagesArticles))}
                  disabled={currentPageArticles === totalPagesArticles}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700/50 text-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Our Client Speaks Section - Moved to Last */}
    <section className="w-full py-20 sm:py-28 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-transparent"></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Our Clients <span className="text-amber-600">Speak</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
          Hear from those who have experienced transformation through our journeys
        </p>
      </div>
      
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-8 pb-8" id="testimonialContainer">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center transform hover:-translate-y-3 transition-all duration-500">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-4 ring-amber-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-amber-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed text-base">
                  {testimonial.testimonial}
                </p>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-gray-300 hover:bg-amber-400 focus:bg-amber-600 transition-colors duration-300"
              onClick={() => {
                const container = document.getElementById('testimonialContainer');
                const scrollWidth = container.scrollWidth / testimonials.length;
                container.scrollTo({ left: index * scrollWidth, behavior: 'smooth' });
              }}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  </section>

      {/* Enhanced Modal */}
      {isModalOpen && selectedItem && (
        <>
          {/* Enhanced Backdrop */}
          <div 
            className="fixed inset-0 z-50 transition-all duration-300"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            onClick={closeModal}
          />
          
          {/* Enhanced Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-500 scale-100 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div className="relative">
                <div className="relative w-full h-56 sm:h-72 lg:h-96">
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Enhanced Close Button */}
                <button
                  className="absolute top-6 right-6 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl group"
                  onClick={closeModal}
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Enhanced Modal Body */}
              <div className="p-8 sm:p-12 overflow-y-auto max-h-[calc(95vh-24rem)]">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-4"></div>
                    <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                      {timeAgo(selectedItem.created_at)}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    {selectedItem.title}
                  </h2>
                </div>
                
                <div className="prose prose-lg prose-gray max-w-none">
                  <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {selectedItem.content}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Modal Footer */}
              <div className="border-t border-gray-100 p-8 sm:p-12 bg-gradient-to-r from-gray-50 to-amber-50/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thank you for reading</p>
                      <p className="text-lg font-semibold text-gray-900">Share your thoughts with us</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Close Article</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutSections;