"use client";
import { useState } from 'react';
import { verifyApiKey } from '../../lib/apiKeys';
import { useRouter } from 'next/navigation';

export default function ApiPlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const isValid = await verifyApiKey(apiKey);
    if (isValid) {
      router.push('/secure-zone');
    } else {
      setError('API key entered is not correct!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6">API Playground</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 p-6 bg-zinc-100 dark:bg-zinc-800 rounded shadow">
        <label htmlFor="apiKey" className="font-semibold">Enter your API Key:</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className="p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          required
        />
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
      </form>
      <div style={{ position: 'fixed', bottom: 24, left: 0, width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}>
        <a
          href="/dashboards"
          style={{
            pointerEvents: 'auto',
            background: '#22c55e',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(34,197,94,0.15)',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          ← Back to API Tables
        </a>
      </div>
    </div>
  );
} 