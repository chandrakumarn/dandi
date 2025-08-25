"use client";
import { useState } from "react";
export default function GithubSummarizerWelcomePage() {
  const [requestBody, setRequestBody] = useState('{\n  "githubUrl": "https://github.com/assafelovic/gpt-researcher"\n}');
  const [apiKey, setApiKey] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  function formatReadable(data) {
    const readable = {
      message: data?.message ?? null,
      summary: data?.summary ?? null,
      cool_facts: data?.cool_facts ?? [],
    };
    return JSON.stringify(readable, null, 2);
  }

  async function handleSendRequest() {
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (e) {
      const verbose = {
        error: "Invalid JSON in API Request",
        details: String(e?.message || e),
        request: {
          url: "https://dandi-rosy-one.vercel.app/api/github-summarizer",
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey || "<empty>" },
          body: requestBody,
        },
      };
      setResponseText(JSON.stringify(verbose, null, 2));
      return;
    }
    if (!apiKey) {
      const verbose = {
        error: "Missing x-api-key",
        hint: "Provide your API key in the x-api-key field",
        request: {
          url: "https://dandi-rosy-one.vercel.app/api/github-summarizer",
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": "<missing>" },
          body: parsedBody,
        },
      };
      setResponseText(JSON.stringify(verbose, null, 2));
      return;
    }
    setLoading(true);
    setResponseText("");
    try {
      // Normalize body key for our API route which expects `githuburl`
      if (parsedBody.githubUrl && !parsedBody.githuburl) {
        parsedBody.githuburl = parsedBody.githubUrl;
        delete parsedBody.githubUrl;
      }

      // Use our local Next.js API route as a proxy to avoid CORS
      const url = "/api/github-summarizer";
      const reqInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(parsedBody),
      };
      const res = await fetch(url, reqInit);
      const rawText = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch (_) {
        parsed = rawText;
      }

      if (!res.ok) {
        const verbose = {
          error: "Request failed",
          request: {
            url,
            ...reqInit,
          },
          response: {
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
            headers: Object.fromEntries(Array.from(res.headers.entries())),
            body: parsed,
          },
        };
        setResponseText(JSON.stringify(verbose, null, 2));
        setLoading(false);
        return;
      }

      // success path: show only selected fields for readability
      if (typeof parsed === "string") {
        setResponseText(parsed);
      } else {
        setResponseText(formatReadable(parsed));
      }
    } catch (err) {
      const verbose = {
        error: "Network or CORS error",
        details: String(err?.message || err),
        request: {
          url: "https://dandi-rosy-one.vercel.app/api/github-summarizer",
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: parsedBody,
        },
      };
      setResponseText(JSON.stringify(verbose, null, 2));
    }
    setLoading(false);
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.9 3.18 9.05 7.59 10.52.56.1.77-.24.77-.54v-1.87c-3.09.67-3.74-1.49-3.74-1.49-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.66 1.76 2.66 1.25.1-.75.4-1.26.73-1.55-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.42.1-2.95 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.59 1.53.21 2.67.1 2.95.71.78 1.14 1.77 1.14 2.98 0 4.25-2.59 5.18-5.06 5.47.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.78.54 4.4-1.47 7.58-5.62 7.58-10.52C23.23 5.46 18.27.5 12 .5z" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">GitHub Summarizer</span>
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

      <main className="flex-1 px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Welcome to the GitHub Summarizer</h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              This space will soon help you summarize repositories, pull requests, and issues.
              For now, enjoy this welcome page and check back soon for updates.
            </p>
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <span className="text-gray-700 font-medium">Ready to explore?</span>
              <a href="/api-playground" className="text-green-700 bg-green-100 hover:bg-green-200 border border-green-200 rounded-xl px-3 py-2 font-semibold transition-colors">
                Go to API Playground
              </a>
            </div>
          </div>

          <h2 className="mt-12 sm:mt-16 text-2xl sm:text-3xl font-bold text-gray-900 text-center">Try It Out</h2>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-900">API Request</div>
                <div className="text-gray-500 text-sm">Edit the payload and send a request</div>
              </div>
              <textarea
                className="w-full h-64 sm:h-72 rounded-xl border border-gray-300 bg-gray-50 p-3 sm:p-4 font-mono text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">x-api-key</label>
                <input
                  type="text"
                  placeholder="Enter your x-api-key"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 sm:px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={handleSendRequest} disabled={loading} className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-4 sm:px-5 py-2.5 font-semibold transition-colors shadow">
                  Send Request
                </button>
                <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 rounded-xl px-4 py-2 font-medium transition-colors">
                  Documentation
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-900">API Response</div>
                <div className="text-gray-500 text-sm">View the response from the API</div>
              </div>
              <textarea
                className="w-full h-64 sm:h-72 rounded-xl border border-gray-300 bg-gray-50 p-3 sm:p-4 font-mono text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y"
                placeholder={`{\n  "summary": "..."\n}`}
                value={responseText}
                readOnly
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p className="text-sm sm:text-base">© 2025 Dandi GitHub Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

