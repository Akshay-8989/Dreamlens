import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LogDream from "./pages/LogDream";
import DreamTimeline from "./pages/DreamTimeline";
import DreamMap from "./pages/DreamMap";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LogDream />} />
        <Route path="/timeline" element={<DreamTimeline />} />
        <Route path="/map" element={<DreamMap />} />
      </Routes>
    </Router>
  );
}

export default App;
