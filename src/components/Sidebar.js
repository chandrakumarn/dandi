import { CloseIcon } from './icons';
import Image from 'next/image';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay only shows on mobile or when sidebar is toggled */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden={false}
        />
      )}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 min-h-screen bg-white border-r border-gray-200 shadow-lg px-6 py-8 flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ display: open ? 'flex' : '', position: open ? 'fixed' : '' }}
      >
        {/* X button for all screens */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
        
        {/* User Profile Section - Now at the top */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
          <Image
            src="/chandrakumar-profile-resized.jpg"
            alt="Chandrakumar N"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-blue-200"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">Chandrakumar N</span>
            <span className="text-sm text-gray-600">Data Scientist</span>
          </div>
        </div>
        
        <div className="text-2xl font-bold mb-10 tracking-tight text-gray-900">Dandi AI</div>
        <nav className="flex-1 flex flex-col gap-2 text-gray-700">
          <a className="flex items-center gap-3 font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl px-4 py-3 border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200" href="/api-playground">
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
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span>🏠</span> Overview
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span>✨</span> Research Assistant
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span>📄</span> Research Reports
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span>🧾</span> Invoices
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span>📚</span> Documentation
          </a>
        </nav>
      </aside>
    </>
  );
} 