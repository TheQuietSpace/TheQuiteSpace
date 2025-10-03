'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabse';
import { MessageSquare, Eye, Clock } from "lucide-react";

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

  // Function to calculate time ago (show in hours)
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    if (diffInMs <= 0) return '0 hours ago';
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (hours < 1) return 'Less than 1 hour ago';
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
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

  // Updated BlogCard component for horizontal layout with text left, image right
  const BlogCard = ({ blog, onReadMore }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
      <div className="bg-white rounded-3xl duration-300 overflow-hidden">
        <div className="flex flex-col sm:flex-row h-full">
          {/* Left Content Section */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between order-2 sm:order-1">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-amber-600 transition-colors duration-300 line-clamp-2">
              {blog.title}
            </h2>

            {/* Time and Menu */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">{timeAgo(blog.created_at)}</span>
              
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  </div>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700 text-sm">
                      Share
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700 text-sm">
                      Save
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700 text-sm">
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
              {blog.content}
            </p>

            {/* Read More Button */}
            <button 
              onClick={() => onReadMore(blog)}
              className="text-[#c1a050] font-medium text-sm flex items-center gap-2 group mt-auto"
            >
              Read More
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Image Section */}
          <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden order-1 sm:order-2">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-3xl sm:rounded-l-none sm:rounded-r-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Enhanced Hero Section with visible content */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('/Frame 1410119435.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </div>
      </section>

      {/* Enhanced Blogs Section with 2x2 grid */}
      <section id="latest-blogs" className="w-full bg-[#faf8f5] py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Blogs
            </h2>
          </div>
          
          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {paginatedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onReadMore={handleReadMore}
              />
            ))}
          </div>

          {/* Centered Pagination for Blogs */}
          {totalPagesBlogs > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPageBlogs((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageBlogs === 1}
                aria-label="Previous blogs"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
                  currentPageBlogs === 1 ? 'bg-gray-100 opacity-40 pointer-events-none' : 'bg-[#c1a050] hover:bg-[#b98f45]'
                }`}
              >
                <svg
                  className={`${currentPageBlogs === 1 ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
               </button>

               <button
                 onClick={() => setCurrentPageBlogs((prev) => Math.min(prev + 1, totalPagesBlogs))}
                 disabled={currentPageBlogs === totalPagesBlogs}
                 aria-label="Next blogs"
                 className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
                   currentPageBlogs === totalPagesBlogs ? 'bg-gray-100 opacity-40 pointer-events-none' : 'bg-[#c1a050] hover:bg-[#b98f45]'
                 }`}
               >
                <svg
                  className={`${currentPageBlogs === totalPagesBlogs ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
               </button>
             </div>
           )}
        </div>
      </section>

      {/* Enhanced Whispers from the Journey Section */}
      <section className="w-full py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white to-transparent"></div>
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8">
            {/* Slightly larger image — wider column on lg and matches text height */}
            <div className="w-full lg:w-2/5 flex-shrink-0">
              <Image
                src="/Group 4285.png"
                alt="Group 4285"
                width={800}
                height={520}
                className="object-cover w-full h-[220px] sm:h-[280px] lg:h-full transition-transform duration-500"
              />
            </div>
            
            {/* Enhanced Text Content */}
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-2xl px-2">
               <h2 className="text-5xl font-semibold text-gray-900 mb-6 sm:mb-8 leading-tight">
                 Whispers from the Journey
               </h2>
               <p className="text-base text-gray-700 mb-8 sm:mb-10 leading-relaxed">
                 Each month, we pause to gather the quiet moments, the lessons from our journeys, and the whispers of stillness carried back from retreat. <br /> These reflections and travel diaries are an offering of wisdom and wonder.
               </p>
               <button
                 className="group inline-flex items-center bg-[#c1a050] hover:from-amber-600 hover:to-amber-700 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:-translate-y-1"
                 onClick={() => {
                   const el = document.getElementById('featured-articles');
                   if (el) {
                     el.scrollIntoView({ behavior: 'smooth' });
                   }
                 }}
               >
                 <span>Explore</span>
               </button>
             </div>
           </div>
         </div>
       </section>

      {/* Enhanced Articles Section */}
      <section id="featured-articles" className="w-full py-16 sm:py-24 bg-[#faf8f5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-black font-semibold mb-6">
              Articles
            </h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {paginatedArticles.map((article, index) => (
              <div key={article.id} className="flex flex-col md:flex-row gap-6 bg-white rounded-3xl overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[300px]">
                  <Image 
                    src={article.image_url} 
                    alt={article.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-6 md:p-8 md:w-3/5">
                  <h2 className="text-xl font-bold text-[#c1a050] mb-5 leading-tight line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {article.content}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 mb-5 text-[#c1a050]">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm text-gray-600 font-medium">{Math.floor(Math.random() * 50) + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm text-gray-600 font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm text-gray-600 font-medium">{timeAgo(article.created_at)}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <button
                    onClick={() => handleReadMore(article)}
                    className="text-[#c1a050] font-medium text-sm flex items-center gap-2 group w-fit underline decoration-2 decoration-[#c1a050] underline-offset-4"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Centered Pagination for Articles (brand color prev/next buttons) */}
          {totalPagesArticles > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPageArticles((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageArticles === 1}
                aria-label="Previous articles"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
                  currentPageArticles === 1 ? 'bg-gray-100 opacity-40 pointer-events-none' : 'bg-[#c1a050] hover:bg-[#b98f45]'
                }`}
              >
                <svg
                  className={`${currentPageArticles === 1 ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
               </button>

               <button
                 onClick={() => setCurrentPageArticles((prev) => Math.min(prev + 1, totalPagesArticles))}
                 disabled={currentPageArticles === totalPagesArticles}
                 aria-label="Next articles"
                 className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
                   currentPageArticles === totalPagesArticles ? 'bg-gray-100 opacity-40 pointer-events-none' : 'bg-[#c1a050] hover:bg-[#b98f45]'
                 }`}
               >
                <svg
                  className={`${currentPageArticles === totalPagesArticles ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
               </button>
             </div>
           )}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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