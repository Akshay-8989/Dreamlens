import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DreamCard from "../components/DreamCard";
import { getDreams, enhanceDream } from "../api/axios";

export default function DreamTimeline() {
  const [dreams, setDreams] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [enhancedDreamId, setEnhancedDreamId] = useState(null);
  const [enhancedText, setEnhancedText] = useState("");
  const [enhancingLoading, setEnhancingLoading] = useState(false);
  const [enhanceError, setEnhanceError] = useState(null);

  useEffect(() => {
    fetchDreams();
  }, []);

  const fetchDreams = async () => {
    try {
      setLoading(true);
      // Removed console.logs added in the last step for brevity in final code,
      // but keep them if you need more debugging.
      const res = await getDreams(); // 'res' itself should now be the array of dreams

      // FIX: Check if 'res' is an array, not 'res.data'
      if (Array.isArray(res)) {
        setDreams(res); // Set dreams directly to 'res'
      } else {
        // Log a warning if the data isn't an array but not an error
        console.warn("API returned non-array data for dreams:", res); // 'res' is the actual data here
        setDreams([]); // Default to empty array to prevent crash
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching dreams:", err);
      setError("Failed to load dreams. Please try again.");
      setDreams([]); // Ensure dreams is an empty array on error too
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceDream = async (dreamId) => {
    setEnhancedDreamId(dreamId);
    setEnhancingLoading(true);
    setEnhancedText("");
    setEnhanceError(null);

    try {
      const enhancedData = await enhanceDream(dreamId);
      setEnhancedText(enhancedData.excerpt);
    } catch (err) {
      console.error("Error enhancing dream:", err);
      setEnhanceError("Could not enhance dream. Please try again.");
      setEnhancedText("");
    } finally {
      setEnhancingLoading(false);
    }
  };

  const closeEnhancedView = () => {
    setEnhancedDreamId(null);
    setEnhancedText("");
    setEnhanceError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dream Timeline</h1>
          <Link to="/" className="text-indigo-600 hover:underline">
            + Log New
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading dreams...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : dreams.length > 0 ? ( // This line is now safe because 'dreams' will always be an array
          dreams.map((dream) => (
            <div
              key={dream.id}
              className="bg-white rounded-lg shadow-md p-6 mb-4"
            >
              <DreamCard dream={dream} />
              <div className="mt-4 flex items-center space-x-2">
                <button
                  onClick={() => handleEnhanceDream(dream.id)}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200
                              ${
                                enhancingLoading && enhancedDreamId === dream.id
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-purple-600 hover:bg-purple-700"
                              }`}
                  disabled={enhancingLoading && enhancedDreamId === dream.id}
                >
                  {enhancingLoading && enhancedDreamId === dream.id
                    ? "Enhancing..."
                    : "Enhance Dream"}
                </button>

                {enhancedDreamId === dream.id && (enhancingLoading || enhancedText || enhanceError) && (
                  <div className="flex-1 p-3 bg-indigo-50 rounded-md ml-4 border border-indigo-200">
                    {enhancingLoading && enhancedDreamId === dream.id ? (
                      <p className="text-indigo-700">Enhancing dream...</p>
                    ) : enhanceError ? (
                      <p className="text-red-500">{enhanceError}</p>
                    ) : (
                      <>
                        <h3 className="font-semibold text-indigo-800 mb-2">Enhanced Dream:</h3>
                        <p className="text-indigo-900">{enhancedText}</p>
                        <button
                          onClick={closeEnhancedView}
                          className="mt-2 text-sm text-indigo-600 hover:underline"
                        >
                          Close Enhanced View
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No dreams logged yet. Start dreaming!</p>
        )}
      </div>
    </div>
  );
}