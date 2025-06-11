// src/pages/LogDream.jsx

import { useState } from "react";
import { createDream } from '../api/axios';
import { useNavigate } from "react-router-dom";

export default function LogDream() {
  // Removed 'title' and 'excerpt' states. 'content' will serve as the main input.
  const [content, setContent] = useState(""); // Main dream content
  const [emotions, setEmotions] = useState("");
  const [symbols, setSymbols] = useState("");
  const [themes, setThemes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure content is not empty before submitting
    if (!content.trim()) {
      alert("Dream content is required!");
      return;
    }

    try {
      await createDream({
        // Send the main content for both the full dream and a potential excerpt
        // The backend might use the first part of 'content' as an excerpt if needed,
        // or AI can derive it from the full content.
        content: content.trim(),
        // No separate 'excerpt' field sent from frontend, relying on backend/AI if needed
        emotions: emotions.split(",").map(e => e.trim()).filter(e => e !== ''),
        symbols: symbols.split(",").map(s => s.trim()).filter(s => s !== ''),
        themes: themes.split(",").map(t => t.trim()).filter(t => t !== ''),
      });
      navigate("/timeline");
    } catch (err) {
      alert("Failed to log dream. Check console for details.");
      console.error("Error submitting dream:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-10">
      <div className="max-w-xl w-full bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-white">
        <h2 className="text-3xl font-bold text-blue-300 text-center mb-6">Log a New Dream</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Single, Primary Dream Content Input */}
          <div>
            <label htmlFor="content" className="block text-gray-300 text-sm font-semibold mb-2">Describe Your Dream</label>
            <textarea
              id="content"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 h-48 resize-y" // Larger textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your dream in detail. Include any key events, feelings, objects, or people."
              required
            />
          </div>

          {/* Emotions */}
          <div>
            <label htmlFor="emotions" className="block text-gray-300 text-sm font-semibold mb-2">Emotions (comma-separated)</label>
            <input
              type="text"
              id="emotions"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
              placeholder="e.g. joy, fear, excitement"
            />
          </div>

          {/* Symbols */}
          <div>
            <label htmlFor="symbols" className="block text-gray-300 text-sm font-semibold mb-2">Symbols (comma-separated)</label>
            <input
              type="text"
              id="symbols"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={symbols}
              onChange={(e) => setSymbols(e.target.value)}
              placeholder="e.g. ocean, bird, forest"
            />
          </div>

          {/* Themes */}
          <div>
            <label htmlFor="themes" className="block text-gray-300 text-sm font-semibold mb-2">Themes (comma-separated)</label>
            <input
              type="text"
              id="themes"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={themes}
              onChange={(e) => setThemes(e.target.value)}
              placeholder="e.g. transformation, conflict, discovery"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Submit Dream
          </button>
        </form>
      </div>
    </div>
  );
}