// src/components/DreamCard.jsx

import React, { useState } from 'react';

export default function DreamCard({ dream, onEnhanceSuccess }) { // Added onEnhanceSuccess prop
  const symbolsToDisplay = dream.symbols ?? [];
  const emotionsToDisplay = dream.emotions ?? [];
  const themesToDisplay = dream.themes ?? [];

  // State for managing enhancement status and displaying immediate result
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [currentEnhancedContent, setCurrentEnhancedContent] = useState(dream.enhanced_content || ''); // Assume dream has enhanced_content field

  const formattedDate = dream.created_at
    ? new Date(dream.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No Date';

  const handleEnhanceClick = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch(`http://localhost:8000/dreams/${dream.id}/enhance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if you have authentication, e.g., 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.detail || response.statusText}`);
      }
      const result = await response.json();
      setCurrentEnhancedContent(result.enhanced_content);
      // Call callback to parent (DreamTimeline) to signal a need to refresh
      if (onEnhanceSuccess) {
        onEnhanceSuccess();
      }
    } catch (error) {
      console.error("Error enhancing dream:", error);
      alert("Failed to enhance dream: " + error.message);
      setCurrentEnhancedContent("Error: Could not enhance dream.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="
      bg-gray-800 rounded-lg shadow-xl p-6 mb-4
      border border-gray-700
      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
    ">
      <p className="text-gray-400 text-sm mb-2">{formattedDate}</p>
      <h3 className="text-xl font-bold text-pink-300 mb-2">{dream.title || dream.excerpt || 'Untitled Dream'}</h3>
      <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
        {dream.content}
      </p>

      {symbolsToDisplay.length > 0 && (
        <p className="text-gray-400 text-sm">
          <strong>Symbols:</strong> {symbolsToDisplay.join(", ")}
        </p>
      )}

      {themesToDisplay.length > 0 && (
        <p className="text-gray-400 text-sm">
          <strong>Themes:</strong> {themesToDisplay.join(", ")}
        </p>
      )}

      {emotionsToDisplay.length > 0 && (
        <p className="text-gray-400 text-sm">
          <strong>Emotions:</strong> {emotionsToDisplay.join(", ")}
        </p>
      )}

      {/* AI Enhanced Content Display */}
      {(currentEnhancedContent || dream.enhanced_content) && (
        <div className="mt-4 p-3 bg-gray-700 rounded-md text-gray-200 border border-gray-600">
          <h4 className="font-semibold text-blue-300 mb-2">AI Insights:</h4>
          <p>{currentEnhancedContent || dream.enhanced_content}</p>
        </div>
      )}

      {/* Enhance Button */}
      <button
        onClick={handleEnhanceClick}
        disabled={isEnhancing} // Disable button while enhancing
        className={`mt-4 w-full py-2 px-4 rounded-md text-sm font-semibold transition duration-300
          ${isEnhancing ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}
        `}
      >
        {isEnhancing ? 'Enhancing...' : 'Enhance Dream with AI'}
      </button>
    </div>
  );
}