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
    <section className="bg-[#FAF8F5] py-10 px-4 relative overflow-hidden">
      
      {/* Left side decorative bars - upside down, positioned with first testimonial */}
      <div className="absolute bottom-36 left-1/4 flex items-start space-x-1 transform -translate-x-1/2 translate-y-full hidden lg:flex">
        {[95, 85, 75, 65, 55, 45, 35, 25, 15, 25, 35].map((height, i) => (
          <div
            key={i}
            className="bg-[#C1A050] rounded-b-sm"
            style={{ 
              width: '4px', 
              height: `${height}px`
            }}
          />
        ))}
      </div>

      {/* Top right decorative bars - positioned with second testimonial */}
      <div className="absolute top-16 right-1/4 flex items-end space-x-1 transform translate-x-1/2 hidden xl:flex">
        {[25, 35, 45, 55, 75, 85, 95, 105, 115, 105, 95, 85, 75, 65].map((height, i) => (
          <div
            key={i}
            className="bg-[#C1A050] rounded-sm"
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
          <h2 className="text-4xl font-semibold text-[#C1A050] mb-8">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          
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

        {/* Navigation Controls - Arrows and Pagination Dots */}
        <div className="flex items-center justify-center space-x-6 mt-8 md:mt-12">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 md:w-14 md:h-14 text-[#C1A050] hover:text-[#a8905a] transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <span className="text-3xl md:text-4xl font-bold">&lt;</span>
          </button>

          {/* Pagination Dots */}
          <div className="flex space-x-2 md:space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#C1A050] scale-125' 
                    : 'bg-gray-300 hover:bg-[#C1A050]/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 md:w-14 md:h-14 text-[#C1A050] hover:text-[#a8905a] transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <span className="text-3xl md:text-4xl font-bold">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;