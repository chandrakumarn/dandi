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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Dandi Github Analyzer</span>
            </div>
            <a 
              href="/dashboards"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">← Back to Dashboard</span>
              <span className="sm:hidden">← Back</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">API Playground</h1>
            <p className="text-gray-600 text-base sm:text-lg">Test your API key and explore the playground</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your API Key
                </label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your API key here"
                  required
                />
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium text-sm sm:text-base">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p className="text-sm sm:text-base">&copy; 2025 Dandi Github Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 