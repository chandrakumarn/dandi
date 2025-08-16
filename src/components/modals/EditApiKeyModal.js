import { useState } from 'react';

export default function EditApiKeyModal({ initialLabel, onEdit, onCancel, loading }) {
  const [label, setLabel] = useState(initialLabel);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md flex flex-col items-center border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-gray-900">Edit API key</h2>
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">Update the name for your API key.</p>
          <form
            className="flex flex-col gap-4 sm:gap-6"
            onSubmit={e => {
              e.preventDefault();
              if (label.trim()) onEdit(label.trim());
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="api-key-name">
                Key Name <span className="text-gray-400 text-xs sm:text-sm">— A unique name to identify this key</span>
              </label>
              <input
                id="api-key-name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Key Name"
                required
                autoFocus
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4 sm:mt-6">
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="px-6 sm:px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 