import { useState } from 'react';

export default function CreateApiKeyModal({ onCreate, onCancel, loading }) {
  const [label, setLabel] = useState("");
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [limit, setLimit] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2 text-center">Create a new API key</h2>
          <p className="text-zinc-500 text-center mb-6">Enter a name and limit for the new API key.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              if (label.trim()) onCreate(label.trim(), limitEnabled ? limit : null);
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="api-key-name">
                Key Name <span className="text-zinc-400">— A unique name to identify this key</span>
              </label>
              <input
                id="api-key-name"
                className="w-full rounded border px-3 py-2 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Key Name"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={limitEnabled}
                  onChange={e => setLimitEnabled(e.target.checked)}
                  className="accent-blue-600"
                />
                Limit monthly usage*
              </label>
              <input
                type="number"
                min="1"
                className="w-full mt-2 rounded border px-3 py-2 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={limit}
                onChange={e => setLimit(e.target.value)}
                placeholder="1000"
                disabled={!limitEnabled}
              />
              <div className="text-xs text-zinc-400 mt-1">
                * If the combined usage of all your keys exceeds your plans limit, all requests will be rejected.
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
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