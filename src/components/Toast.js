export default function Toast({ message, color, visible }) {
  if (!visible) return null;

  const baseClasses = "fixed bottom-4 right-4 px-6 py-4 rounded-xl text-white font-medium shadow-lg transform transition-all duration-300 z-50";
  const colorClasses = color || "bg-blue-600";

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      {message}
    </div>
  );
} 