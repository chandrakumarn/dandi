export default function SecureZonePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
      <h1 className="text-4xl font-extrabold mb-6 text-green-700 dark:text-green-400">API key is valid!</h1>
      <p className="text-2xl font-bold">We have entered the <span className="underline">secure zone</span> 🚀</p>
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