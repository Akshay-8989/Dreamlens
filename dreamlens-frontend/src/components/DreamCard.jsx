import React from 'react';

export default function DreamCard({ dream }) {
  // Ensure 'symbols', 'themes', and 'emotions' are always arrays before trying to join them.
  // Use the nullish coalescing operator (??) to default to an empty array if the property is null or undefined.
  const symbolsToDisplay = dream.symbols ?? [];
  const emotionsToDisplay = dream.emotions ?? [];
  const themesToDisplay = dream.themes ?? []; // Defensive for 'themes' if it's new or optional

  // Format the date if created_at exists
  const formattedDate = dream.created_at
    ? new Date(dream.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No Date';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      {/* Use formattedDate from created_at */}
      <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
      <h3 className="text-lg font-semibold mb-2">{dream.excerpt}</h3>

      {/* Conditionally render paragraphs only if there are items to display */}
      {symbolsToDisplay.length > 0 && (
        <p className="text-gray-700">
          <strong>Symbols:</strong> {symbolsToDisplay.join(", ")}
        </p>
      )}

      {themesToDisplay.length > 0 && ( // Assuming 'themes' is a potential field in your dream object
        <p className="text-gray-700">
          <strong>Themes:</strong> {themesToDisplay.join(", ")}
        </p>
      )}

      {emotionsToDisplay.length > 0 && (
        <p className="text-gray-700">
          <strong>Emotions:</strong> {emotionsToDisplay.join(", ")}
        </p>
      )}
    </div>
  );
}