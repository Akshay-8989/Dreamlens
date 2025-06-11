export default function DreamCard({ dream }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <p className="text-gray-500 text-sm mb-2">{dream.date}</p>
      <h3 className="text-lg font-semibold mb-2">{dream.excerpt}</h3>
      <p><strong>Symbols:</strong> {dream.symbols.join(", ")}</p>
      <p><strong>Themes:</strong> {dream.themes.join(", ")}</p>
      <p><strong>Emotions:</strong> {dream.emotions.join(", ")}</p>
    </div>
  );
}
