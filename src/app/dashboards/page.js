"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";
import CreateApiKeyModal from "../../components/modals/CreateApiKeyModal";
import EditApiKeyModal from "../../components/modals/EditApiKeyModal";
import { EyeIcon, CopyIcon, EditIcon, TrashIcon, PlusIcon, HamburgerIcon } from "../../components/icons";
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from "../../lib/apiKeys";

// MOCK DATA
const mockPlan = {
  name: "Researcher",
  usage: 24,
  limit: 1000,
};

function TopBar({ onMenuClick, sidebarOpen }) {
  return (
    <header className="flex items-center justify-between gap-3 px-8 py-4 bg-transparent">
      {!sidebarOpen && (
        <button className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={onMenuClick} aria-label="Open sidebar">
          <HamburgerIcon />
        </button>
      )}
      <div className="flex-1 flex justify-end gap-3">
        <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">● Operational</span>
        <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/></svg></button>
        <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 6.5a2.5 2.5 0 0 0-5 0v.5h-8v-.5a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 0 5 0v-.5h8v.5a2.5 2.5 0 0 0 5 0v-11Z" stroke="currentColor" strokeWidth="1.5"/></svg></button>
        <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="1.5"/></svg></button>
        <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/></svg></button>
      </div>
    </header>
  );
}

function PlanCard() {
  return (
    <div className="rounded-2xl shadow-lg p-8 mb-8 bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-white/30 text-xs font-semibold px-3 py-1 rounded-full">CURRENT PLAN</span>
        <button className="bg-white/30 text-xs font-semibold px-3 py-1 rounded-full hover:bg-white/50 transition">Manage Plan</button>
      </div>
      <div className="text-3xl font-bold mb-2">{mockPlan.name}</div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-medium">API Limit</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/></svg>
      </div>
      <div className="w-full h-2 bg-white/40 rounded-full mb-2 overflow-hidden">
        <div className="h-2 bg-white/80 rounded-full" style={{ width: `${(mockPlan.usage / mockPlan.limit) * 100}%` }}></div>
      </div>
      <div className="text-sm font-medium">{mockPlan.usage} / {mockPlan.limit} Requests</div>
    </div>
  );
}

function ApiKeyTable({ apiKeys, onEdit, onDelete, onCopy, visibleKeys, onToggleVisible, onCreateClick }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-lg font-semibold">API Keys</div>
        <button
          className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full px-4 py-2 font-medium text-sm transition-colors"
          title="Add API Key"
          onClick={onCreateClick}
        >
          <PlusIcon />
          Create New API Key
        </button>
      </div>
      <div className="text-zinc-500 text-sm mb-4">The key is used to authenticate your requests to the <a href="#" className="underline">Research API</a>. To learn more, see the <a href="#" className="underline">documentation</a> page.</div>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase">
            <th className="py-2">Name</th>
            <th className="py-2">Usage</th>
            <th className="py-2">Key</th>
            <th className="py-2 text-right">Options</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map(k => {
            const isVisible = visibleKeys[k.id];
            return (
              <tr key={k.id} className="bg-zinc-50 dark:bg-zinc-800 rounded">
                <td className="py-2 font-medium">{k.label}</td>
                <td className="py-2">{k.usage}</td>
                <td className="py-2 font-mono text-xs select-all">{isVisible ? k.key : "\u2022".repeat(k.key.length)}</td>
                <td className="py-2 text-right flex gap-2 justify-end">
                  <button className="hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 rounded" title={isVisible ? "Hide" : "Show"} onClick={() => onToggleVisible(k.id)}>
                    {isVisible ? <EyeIcon /> : <EyeIcon />}
                  </button>
                  <button className="hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 rounded" title="Copy" onClick={() => onCopy(k.key)}><CopyIcon /></button>
                  <button className="hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 rounded" title="Edit" onClick={() => onEdit(k.id)}><EditIcon /></button>
                  <button className="hover:bg-red-100 dark:hover:bg-red-900 p-1 rounded" title="Delete" onClick={() => onDelete(k.id)}><TrashIcon /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardsPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [toastColor, setToastColor] = useState("bg-green-600");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch API keys from Supabase on mount
  useEffect(() => {
    async function loadKeys() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchApiKeys();
        setApiKeys(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    loadKeys();
  }, []);

  // Handlers for actions
  const handleEdit = (id) => setEditId(id);
  const handleEditSave = async (newLabel) => {
    setLoading(true);
    setError("");
    try {
      await updateApiKey(editId, { label: newLabel });
      setApiKeys(keys => keys.map(k => (k.id === editId ? { ...k, label: newLabel } : k)));
      setToast("API key updated!");
      setToastColor("bg-green-600");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setError(err.message);
    }
    setEditId(null);
    setLoading(false);
  };
  const handleEditCancel = () => setEditId(null);
  
  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await deleteApiKey(id);
      setApiKeys(keys => keys.filter(k => k.id !== id));
      setToast("API key deleted!");
      setToastColor("bg-red-600");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  
  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setToast("API key copied!");
    setToastColor("bg-green-600");
    setTimeout(() => setToast(""), 2000);
  };
  
  const handleToggleVisible = (id) => {
    setVisibleKeys(v => ({ ...v, [id]: !v[id] }));
  };
  
  const handleCreate = async (label, limit) => {
    setLoading(true);
    setError("");
    try {
      const newKey = await createApiKey(label, limit);
      setApiKeys(keys => [...keys, newKey]);
      setToast("API key created!");
      setToastColor("bg-green-600");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setError(err.message);
    }
    setShowCreate(false);
    setLoading(false);
  };

  const editingKey = apiKeys.find(k => k.id === editId);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 px-4 md:px-12 py-8 max-w-5xl mx-auto">
          <div className="mb-4 text-zinc-400 text-sm font-medium">Pages / Overview</div>
          <div className="text-3xl font-bold mb-8">Overview</div>
          <PlanCard />
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {loading && <div className="mb-4 text-blue-600">Loading...</div>}
          <ApiKeyTable
            apiKeys={apiKeys}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCopy={handleCopy}
            visibleKeys={visibleKeys}
            onToggleVisible={handleToggleVisible}
            onCreateClick={() => setShowCreate(true)}
          />
          {showCreate && (
            <CreateApiKeyModal
              onCreate={handleCreate}
              onCancel={() => setShowCreate(false)}
              loading={loading}
            />
          )}
          {editId && editingKey && (
            <EditApiKeyModal
              initialLabel={editingKey.label}
              onEdit={handleEditSave}
              onCancel={handleEditCancel}
              loading={loading}
            />
          )}
          <Toast message={toast} color={toastColor} visible={!!toast} />
        </main>
      </div>
    </div>
  );
} 