import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-indigo-700 font-semibold"
      : "text-gray-600 hover:text-indigo-600";

  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">DreamLens</h1>
        <div className="space-x-6">
          <Link to="/" className={linkClass("/")}>
            Log Dream
          </Link>
          <Link to="/timeline" className={linkClass("/timeline")}>
            Timeline
          </Link>
          <Link to="/map" className={linkClass("/map")}>
            Map
          </Link>
        </div>
      </div>
    </nav>
  );
}
