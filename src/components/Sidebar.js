import { CloseIcon } from './icons';
import Image from 'next/image';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay for all screens when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 min-h-screen bg-white/80 dark:bg-zinc-900/80 border-r border-zinc-200 dark:border-zinc-800 shadow-sm px-6 py-8 flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ display: open ? 'flex' : '', position: open ? 'fixed' : '' }}
      >
        {/* X button for all screens */}
        <button
          className="absolute top-4 right-4 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
        <div className="text-2xl font-bold mb-10 tracking-tight">Dandi AI</div>
        <nav className="flex-1 flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <a className="flex items-center gap-3 font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded px-3 py-2 border border-green-300 dark:border-green-700" href="/api-playground">
            <span className="inline-block align-middle">
              {/* Fancy API Playground Icon: Sparkly Rocket Code */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M2 20L8 14" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 2L14 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="7" y="7" width="8" height="8" rx="2" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2"/>
                  <path d="M10 11H12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 10V12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="11" cy="11" r="4.5" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="2 2"/>
                  <g>
                    <path d="M17 5.5L18.5 4L17 2.5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 17L3.5 18.5L2 17" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                </g>
              </svg>
            </span>
            API Playground
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> <span>🏠</span> Overview</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> <span>✨</span> Research Assistant</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> <span>📄</span> Research Reports</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> <span>🧾</span> Invoices</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> <span>📚</span> Documentation</a>
        </nav>
        <div className="mt-auto flex items-center gap-3 pt-8">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">Eden Marco</span>
        </div>
      </aside>
    </>
  );
} 