export default function Toast({ message, color = "bg-green-600", visible }) {
  if (!visible) return null;

  return (
    <div className={`fixed left-1/2 top-8 z-50 -translate-x-1/2 ${color} text-white px-6 py-3 rounded-xl shadow-lg text-base font-medium animate-fade-in-out`}>
      {message}
    </div>
  );
} 