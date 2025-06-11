// src/pages/Home.jsx

import React from 'react';
// You might need to import FontAwesome icons if you plan to use them.
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFeatherAlt, faScroll, faBrain } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-screen text-white"> {/* Darker background for more depth */}
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient overlay for a mystical feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black opacity-80 z-0"></div>

        {/* Optional: Add a subtle background image/pattern here */}
        {/* For example, if you have an image at /src/assets/stars.png.
            Make sure to place your image file in `src/assets/` or a public folder
            and adjust the path accordingly. */}
        {/*
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: "url('/src/assets/stars.png')" }}
        ></div>
        */}

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-300 mb-4 tracking-tight leading-tight">
            DreamLens
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unravel the mysteries of your subconscious. Log, explore, and understand your dreams.
          </p>
          <button className="
            bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full
            shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out
            text-lg
          ">
            Start Your Dream Journey
          </button>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-400 mb-12">Features at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-700 transform transition-all duration-300 hover:scale-[1.02]">
              {/* If using Font Awesome, uncomment and use: <FontAwesomeIcon icon={faFeatherAlt} className="text-blue-400 text-4xl mb-4" /> */}
              <i className="fas fa-feather-alt text-blue-400 text-4xl mb-4"></i> {/* Placeholder icon */}
              <h3 className="text-2xl font-semibold text-pink-300 mb-2">Effortless Logging</h3>
              <p className="text-gray-400 leading-relaxed">
                Quickly and easily record your dreams with intuitive forms and detailed entries.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-700 transform transition-all duration-300 hover:scale-[1.02]">
              {/* If using Font Awesome, uncomment and use: <FontAwesomeIcon icon={faScroll} className="text-green-400 text-4xl mb-4" /> */}
              <i className="fas fa-scroll text-green-400 text-4xl mb-4"></i> {/* Placeholder icon */}
              <h3 className="text-2xl font-semibold text-blue-300 mb-2">Immersive Timeline</h3>
              <p className="text-gray-400 leading-relaxed">
                Explore your dream history in a beautifully designed, chronological timeline view.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-700 transform transition-all duration-300 hover:scale-[1.02]">
              {/* If using Font Awesome, uncomment and use: <FontAwesomeIcon icon={faBrain} className="text-purple-400 text-4xl mb-4" /> */}
              <i className="fas fa-brain text-purple-400 text-4xl mb-4"></i> {/* Placeholder icon */}
              <h3 className="text-2xl font-semibold text-pink-300 mb-2">Insightful Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Gain deeper insights and understanding into recurring themes with AI-powered enhancements.
              </p>
            </div>
            {/* Add more feature cards as needed */}
          </div>
        </div>
      </div>

      {/* Basic Footer */}
      <footer className="bg-gray-950 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DreamLens. All rights reserved.</p>
      </footer>
    </div>
  );
}