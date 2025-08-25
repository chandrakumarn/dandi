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
        className={`fixed z-50 top-0 left-0 h-full w-72 sm:w-80 min-h-screen bg-white border-r border-gray-200 shadow-lg px-4 sm:px-6 py-6 sm:py-8 flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:z-auto`}
        style={{ display: open ? 'flex' : '', position: open ? 'fixed' : '' }}
      >
        {/* X button for mobile only */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
        
        {/* User Profile Section - Now at the top */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
          <Image
            src="/chandrakumar-profile-resized.jpg"
            alt="Chandrakumar N"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-blue-200 flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">Chandrakumar N</span>
            <span className="text-xs sm:text-sm text-gray-600">Data Scientist</span>
          </div>
        </div>
        
        <div className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 tracking-tight text-gray-900">Dandi AI</div>
        <nav className="flex-1 flex flex-col gap-2 text-gray-700">
          <a className="flex items-center gap-3 font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl px-3 sm:px-4 py-3 sm:py-3 border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200 min-h-[44px]" href="/api-playground">
            <span className="inline-block align-middle flex-shrink-0">
              {/* Fancy API Playground Icon: Sparkly Rocket Code */}
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[22px] sm:h-[22px]">
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
            <span className="text-sm sm:text-base">API Playground</span>
          </a>
          <a className="flex items-center gap-3 font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl px-3 sm:px-4 py-3 sm:py-3 border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200 min-h-[44px]" href="/github-summarizer">
            <span className="inline-block align-middle flex-shrink-0">
              {/* GitHub mark icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="sm:w-[22px] sm:h-[22px]">
                <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.9 3.18 9.05 7.59 10.52.56.1.77-.24.77-.54v-1.87c-3.09.67-3.74-1.49-3.74-1.49-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.66 1.76 2.66 1.25.1-.75.4-1.26.73-1.55-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.42.1-2.95 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.59 1.53.21 2.67.1 2.95.71.78 1.14 1.77 1.14 2.98 0 4.25-2.59 5.18-5.06 5.47.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.78.54 4.4-1.47 7.58-5.62 7.58-10.52C23.23 5.46 18.27.5 12 .5z"/>
              </svg>
            </span>
            <span className="text-sm sm:text-base">Test GitHub Summarizer</span>
          </a>
          <a className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 min-h-[44px]" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span className="text-sm sm:text-base">🏠</span>
            <span className="text-sm sm:text-base">Overview</span>
          </a>
          <a className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 min-h-[44px]" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span className="text-sm sm:text-base">✨</span>
            <span className="text-sm sm:text-base">Research Assistant</span>
          </a>
          <a className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 min-h-[44px]" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span className="text-sm sm:text-base">📄</span>
            <span className="text-sm sm:text-base">Research Reports</span>
          </a>
          <a className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 min-h-[44px]" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span className="text-sm sm:text-base">🧾</span>
            <span className="text-sm sm:text-base">Invoices</span>
          </a>
          <a className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-100 text-gray-500 min-h-[44px]" href="#" tabIndex="-1" aria-disabled="true" title="Coming soon!"> 
            <span className="text-sm sm:text-base">📚</span>
            <span className="text-sm sm:text-base">Documentation</span>
          </a>
        </nav>
      </aside>
    </>
  );
} 