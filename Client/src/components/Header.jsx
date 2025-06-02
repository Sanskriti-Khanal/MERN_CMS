import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="bg-[#d17f4a] text-white pt-16 pb-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png" // Replace with your actual logo asset path
            alt="Stack-security Logo"
            className="h-16 w-16 rounded-full border-4 border-white"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Powerful Learning Management System WP Theme
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-3xl mx-auto">
          Awesome features for creating online courses, teacher profile, extended user profiles, lesson management, quiz system,
          video hosting, ranking system, question system, attachments, course progress, etc.,
        </p>
      </div>

      {/* Device Mockup Images */}
      <div className="mt-16 flex justify-center items-end relative">
        <img
          src={assets.laptopMockup}
          alt="Laptop Mockup"
          className="w-[70%] max-w-4xl z-10"
        />
        <img
          src={assets.tabletMockup}
          alt="Tablet Mockup"
          className="absolute bottom-0 left-[60%] w-40 md:w-52 z-20"
        />
        <img
          src={assets.phoneMockup}
          alt="Phone Mockup"
          className="absolute bottom-0 left-[45%] w-20 md:w-28 z-30"
        />
      </div>
    </section>
  );
};

export default Hero;
