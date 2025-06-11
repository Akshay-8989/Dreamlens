import DreamBubble from "../components/DreamBubble";

export default function DreamMap() {
  const dreams = [
    {
      id: 1,
      excerpt: "Flying through stormy clouds",
      symbols: ["clouds", "sky"],
      emotions: ["excitement"],
    },
    {
      id: 2,
      excerpt: "Running endlessly in a dark maze",
      symbols: ["maze", "darkness"],
      emotions: ["fear"],
    },
    {
      id: 3,
      excerpt: "A warm hug from a loved one",
      symbols: ["hug", "family"],
      emotions: ["joy"],
    },
    {
      id: 4,
      excerpt: "Sinking into the ocean slowly",
      symbols: ["ocean", "depth"],
      emotions: ["sadness"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Dream Emotion Map</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {dreams.map((dream) => (
            <DreamBubble key={dream.id} dream={dream} />
          ))}
        </div>
      </div>
    </div>
  );
}
