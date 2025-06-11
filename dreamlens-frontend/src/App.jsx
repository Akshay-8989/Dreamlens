import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogDream from './pages/LogDream';
import DreamTimeline from './pages/DreamTimeline'; // Make sure this is imported
import Navbar from './components/Navbar';

export default function App() {
  return (
    // Changed bg-indigo-50 to bg-black and text-blue-200 for base text color
    <div className="min-h-screen bg-black text-blue-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogDream />} />
        <Route path="/timeline" element={<DreamTimeline />} />
        {/* Optional: A fallback route for 404 pages */}
        <Route path="*" element={
          <div className="text-blue-400 text-center pt-20">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl">Page Not Found</p>
          </div>
        } />
      </Routes>
    </div>
  );
}