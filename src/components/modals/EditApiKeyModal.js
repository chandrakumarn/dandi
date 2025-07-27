import { useState } from 'react';

export default function EditApiKeyModal({ initialLabel, onEdit, onCancel, loading }) {
  const [label, setLabel] = useState(initialLabel || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2 text-center">Edit API Key Name</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              if (label.trim()) onEdit(label.trim());
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="edit-api-key-name">
                Key Name
              </label>
              <input
                id="edit-api-key-name"
                className="w-full rounded border px-3 py-2 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Key Name"
                required
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
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