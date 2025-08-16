export default function Toast({ message, color, visible }) {
  if (!visible) return null;

  const baseClasses = "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-white font-medium shadow-lg transform transition-all duration-300 z-50 text-sm sm:text-base max-w-sm sm:max-w-md";
  const colorClasses = color || "bg-blue-600";

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      {message}
    </div>
  );
} 