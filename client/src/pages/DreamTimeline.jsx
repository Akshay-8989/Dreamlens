import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DreamCard from "../components/DreamCard";
import api from "../api/axios";

export default function DreamTimeline() {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dreams")
      .then((res) => {
        setDreams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dreams:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dream Timeline</h1>
          <Link to="/" className="text-indigo-600 hover:underline">+ Log New</Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading dreams...</p>
        ) : dreams.length > 0 ? (
          dreams.map((dream) => (
            <DreamCard key={dream.id} dream={dream} />
          ))
        ) : (
          <p className="text-gray-600">No dreams logged yet. Start dreaming!</p>
        )}
      </div>
    </div>
  );
}
