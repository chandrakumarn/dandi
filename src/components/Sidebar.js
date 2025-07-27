import { CloseIcon } from './icons';

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
          <a className="flex items-center gap-3 font-semibold bg-zinc-100 dark:bg-zinc-800 rounded px-3 py-2" href="#"> <span>🏠</span> Overview</a>
          <a className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded" href="#"> <span>✨</span> Research Assistant</a>
          <a className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded" href="#"> <span>📄</span> Research Reports</a>
          <a className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded" href="#"> <span>&lt;/&gt;</span> API Playground</a>
          <a className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded" href="#"> <span>🧾</span> Invoices</a>
          <a className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded" href="#"> <span>📚</span> Documentation</a>
        </nav>
        <div className="mt-auto flex items-center gap-3 pt-8">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
          <span className="font-medium">Eden Marco</span>
        </div>
      </aside>
    </>
  );
} 