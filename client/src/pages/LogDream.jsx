import { useState } from "react";

export default function LogDream() {
  const [dreamText, setDreamText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace this with actual backend API call
    setTimeout(() => {
      setResponse({
        symbols: ["water", "flight", "darkness"],
        themes: ["freedom", "fear"],
        emotions: ["anxiety", "hope"],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Log Your Dream</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Describe your dream in detail..."
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Dream"}
          </button>
        </form>

        {response && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">AI Interpretation:</h2>
            <p><strong>Symbols:</strong> {response.symbols.join(", ")}</p>
            <p><strong>Themes:</strong> {response.themes.join(", ")}</p>
            <p><strong>Emotions:</strong> {response.emotions.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
