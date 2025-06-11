export default function DreamBubble({ dream }) {
  const emotionColors = {
    joy: "bg-yellow-300",
    fear: "bg-red-300",
    excitement: "bg-green-300",
    sadness: "bg-blue-300",
    anxiety: "bg-purple-300",
    hope: "bg-pink-300",
  };

  const colorClass = emotionColors[dream.emotions[0]] || "bg-gray-300";

  return (
    <div
      className={`rounded-full p-4 text-sm shadow-md cursor-pointer transition transform hover:scale-105 ${colorClass}`}
      title={`Symbols: ${dream.symbols.join(", ")}`}
    >
      {dream.excerpt.slice(0, 25)}...
    </div>
  );
}
