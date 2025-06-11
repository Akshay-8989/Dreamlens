import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">Welcome to DreamLens 🌙</h1>
      <p className="text-gray-700 max-w-lg mb-6">
        Log and track your dreams. Analyze patterns in your subconscious with symbols, emotions, and recurring themes.
      </p>
      <Link
        to="/log"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Log Your Dream
      </Link>
    </div>
  );
}
