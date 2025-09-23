import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const AboutSections = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-[50vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-130 sm:w-42 sm:h-42 lg:w-full lg:h-150 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Frame 1410119435.png')`,
            }}
          />
        </div>
      </section>

      {/* Whispers from the Journey Section */}
      <section className="w-full flex flex-col mt-30 items-center justify-center py-16 bg-white">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Images Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-8 w-[420px] h-[420px] min-w-[320px] min-h-[320px]">
            {["/full-shot-women-meditating-nature.jpg", "/participants-practice-yoga-sunrise-tranquil-studio-surrounded-by-nature-panoramic-views.jpg", "/interior-design-yoga-space.jpg", "/serene-yoga-retreat-with-practitioners-gracefully-engaged-poses-amidst-tranquil-surroundings-finding-peace-balance-ai-generative-ai.jpg"].map((src, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-square flex items-center justify-center" style={{width: '200px', height: '200px'}}>
                <Image src={src} alt="Journey" width={200} height={200} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center items-start md:pl-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Whispers from the Journey</h2>
            <p className="text-gray-700 text-lg mb-8 max-w-md">
              Each month, we pause to gather the quiet moments, the lessons from our journeys, and the whispers of stillness carried back from retreat. These reflections and travel diaries are an offering
            </p>
            <button className="bg-[#B59B4C] hover:bg-[#A08A3F] text-white font-semibold px-10 py-3 rounded-lg text-lg transition-all duration-200">Explore</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSections;