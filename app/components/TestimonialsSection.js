import { useState, useRef } from 'react';
import Image from 'next/image';
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Dummy testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      date: "Aug 8, 2025",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus molestie. Suspendisse sed magna eget nibh eu turpis. Consequat duis diam lacus orci. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt.",
      image: "/new2.png",
    },
    {
      id: 2,
      name: "Sarah Johnson", 
      date: "Aug 15, 2025",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus molestie. Suspendisse sed magna eget nibh eu turpis. Consequat duis diam lacus orci. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt.",
      image: "/new2.png",
    },
    {
      id: 3,
      name: "Michael Brown",
      date: "Aug 22, 2025", 
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus molestie. Suspendisse sed magna eget nibh eu turpis. Consequat duis diam lacus orci. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt.",
      image: "/new2.png",
    },
    {
      id: 4,
      name: "Emma Wilson",
      date: "Sep 1, 2025",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus molestie. Suspendisse sed magna eget nibh eu turpis. Consequat duis diam lacus orci. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt.",
      image: "/new2.png",
    }
  ];

  const slidesToShow = 2; // Number of testimonials to show at a time
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);

  const scrollToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    scrollToSlide(prevIndex);
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * slidesToShow;
    return testimonials.slice(start, start + slidesToShow);
  };

  return (
    <section className="bg-white py-10 px-4 relative overflow-hidden">
      
      {/* Left side decorative bars */}
      <div className="absolute bottom-0 left-0 flex items-end space-x-1 p-8 hidden lg:flex">
        {[15, 25, 35, 45, 55, 65, 75, 85, 95, 75, 65].map((height, i) => (
          <div
            key={i}
            className="bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-sm"
            style={{ 
              width: '4px', 
              height: `${height}px`
            }}
          />
        ))}
      </div>

      {/* Top right decorative bars */}
      <div className="absolute top-16 right-12 flex items-end space-x-1 hidden xl:flex">
        {[25, 35, 45, 55, 75, 85, 95, 105, 115, 105, 95, 85, 75, 65].map((height, i) => (
          <div
            key={i}
            className="bg-gradient-to-t from-amber-400 to-amber-300 rounded-sm"
            style={{ 
              width: '3px', 
              height: `${height}px`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-500 mb-8">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 -ml-2 md:-ml-4"
            aria-label="Previous testimonial"
          >
            <span className="text-xl md:text-2xl font-bold text-amber-500">‹</span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 -mr-2 md:-mr-4"
            aria-label="Next testimonial"
          >
            <span className="text-xl md:text-2xl font-bold text-amber-500">›</span>
          </button>

          {/* Testimonials Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 transition-all duration-500">
  {getVisibleTestimonials().map((testimonial) => (
    <div 
      key={testimonial.id}
      className="flex-1 min-w-0"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 shadow-sm rounded-2xl overflow-hidden bg-white">
        {/* Left - Client Image */}
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <div className="relative w-48 lg:w-50 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
            <Image 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
              width={200}
              height={200} 
            />
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="lg:w-2/3 p-4 lg:p-6 flex flex-col justify-between">
          <div>
            <h5 className="text-xs md:text-sm font-semibold text-gray-500 mb-1">
              {testimonial.date}
            </h5>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-tight">
              {testimonial.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {testimonial.content}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              — {testimonial.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 md:space-x-3 mt-8 md:mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-500 scale-125' 
                  : 'bg-amber-300/60 hover:bg-amber-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;