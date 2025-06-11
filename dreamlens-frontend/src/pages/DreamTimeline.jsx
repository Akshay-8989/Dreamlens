// src/pages/DreamTimeline.jsx

import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import DreamCard from '../components/DreamCard';

export default function DreamTimeline() {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the fetchDreams function
  const fetchDreams = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/dreams'); // Ensure this URL is correct for your backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Sort dreams by date, newest first, for the timeline
      const sortedDreams = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setDreams(sortedDreams);
    } catch (e) {
      setError(e.message);
      console.error("Error fetching dreams:", e);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function reference won't change unless dependencies change

  useEffect(() => {
    fetchDreams();
  }, [fetchDreams]); // Depend on fetchDreams to re-run effect if it changes (due to useCallback, it won't)


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-blue-300 text-xl">Loading dreams...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-blue-300 text-center mb-12 tracking-wide">
          Your Dream Journey Timeline
        </h2>

        {dreams.length > 0 ? (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-pink-500 -ml-px"></div>

            {dreams.map((dream, index) => (
              <div
                key={dream.id}
                className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'flex-row-reverse justify-end' : 'justify-start'}`}
              >
                {/* Dream Card - Pass the onEnhanceSuccess callback */}
                <div className="w-11/12 md:w-5/12">
                   <DreamCard dream={dream} onEnhanceSuccess={fetchDreams} /> {/* Pass fetchDreams as callback */}
                </div>

                {/* Timeline Node (The circular marker) */}
                <div className="w-1/12 flex justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-blue-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold"></span> {/* Could put day number here, or an icon */}
                  </div>
                </div>

                {/* Placeholder to balance the flex item on the other side */}
                <div className="w-11/12 md:w-5/12"></div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl mt-20">No dreams logged yet. Start your journey!</p>
        )}
      </div>
    </div>
  );
}