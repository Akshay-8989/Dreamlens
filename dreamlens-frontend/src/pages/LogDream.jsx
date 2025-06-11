import { useState } from "react";
// Correctly importing the specific function we need from axios.js
import { createDream } from '../api/axios';
import { useNavigate } from "react-router-dom";

export default function LogDream() {
  const [excerpt, setExcerpt] = useState("");
  const [emotions, setEmotions] = useState("");
  const [symbols, setSymbols] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FIX: Use the imported 'createDream' function instead of 'axios.post'
      await createDream({ // Call createDream function
        excerpt,
        emotions: emotions.split(",").map(e => e.trim()).filter(e => e !== ''), // Added filter for empty strings
        symbols: symbols.split(",").map(s => s.trim()).filter(s => s !== ''),   // Added filter for empty strings
      });
      navigate("/timeline"); // navigate to the timeline route after successful submission
    } catch (err) {
      alert("Failed to log dream. Check console for details."); // More informative alert
      console.error("Error submitting dream:", err); // Log full error object for debugging
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Log a New Dream</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Dream Excerpt</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            rows="4"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Emotions (comma-separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={emotions}
            onChange={(e) => setEmotions(e.target.value)}
            placeholder="e.g. joy, fear, excitement"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Symbols (comma-separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            placeholder="e.g. ocean, bird, forest"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit Dream
        </button>
      </form>
    </div>
  );
}