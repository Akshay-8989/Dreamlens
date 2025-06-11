// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    // Changed bg-indigo-600 to bg-gray-900, text-white to text-blue-300
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-300 hover:text-blue-100 transition-colors duration-200">
          DreamLens
        </Link>
        <div>
          <Link to="/log" className="text-blue-300 hover:text-blue-100 px-4 py-2 rounded-md transition-colors duration-200">
            Log Dream
          </Link>
          <Link to="/timeline" className="text-blue-300 hover:text-blue-100 px-4 py-2 rounded-md transition-colors duration-200 ml-4">
            Timeline
          </Link>
        </div>
      </div>
    </nav>
  );
}