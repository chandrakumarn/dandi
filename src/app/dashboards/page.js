"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";
import CreateApiKeyModal from "../../components/modals/CreateApiKeyModal";
import EditApiKeyModal from "../../components/modals/EditApiKeyModal";
import ProtectedRoute from "../../components/ProtectedRoute";
import { EyeIcon, CopyIcon, EditIcon, TrashIcon, PlusIcon, HamburgerIcon } from "../../components/icons";
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from "../../lib/apiKeys";

// MOCK DATA
const mockPlan = {
  name: "Researcher",
  usage: 24,
  limit: 1000,
};

function TopBar({ onMenuClick, sidebarOpen, user }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {!sidebarOpen && (
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
            onClick={onMenuClick} 
            aria-label="Open sidebar"
          >
            <HamburgerIcon />
          </button>
        )}
        
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Operational
          </span>
          
          {/* User Profile Section */}
          {user && (
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 py-2 border border-blue-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-300 object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', user.image);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold ${
                  user.image ? 'hidden' : 'flex'
                }`}
              >
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function PlanCard() {
  return (
    <div className="rounded-2xl shadow-lg p-8 mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            CURRENT PLAN
          </span>
          <button className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-white/30 transition backdrop-blur-sm">
            Manage Plan
          </button>
        </div>
        <div className="text-4xl font-bold mb-4">{mockPlan.name}</div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-blue-100">API Limit</span>
          <div className="w-4 h-4 bg-white/30 rounded-full"></div>
        </div>
        <div className="w-full h-3 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div 
            className="h-3 bg-white rounded-full transition-all duration-500" 
            style={{ width: `${(mockPlan.usage / mockPlan.limit) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm font-medium text-blue-100">
          {mockPlan.usage} / {mockPlan.limit} Requests
        </div>
      </div>
    </div>
  );
}

function ApiKeyTable({ apiKeys, onEdit, onDelete, onCopy, visibleKeys, onToggleVisible, onCreateClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold text-gray-900">API Keys</div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          title="Add API Key"
          onClick={onCreateClick}
        >
          <PlusIcon />
          Create New API Key
        </button>
      </div>
      <div className="text-gray-600 text-sm mb-6 leading-relaxed">
        The key is used to authenticate your requests to the <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">Research API</a>. 
        To learn more, see the <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">documentation</a> page.
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 text-gray-700 font-semibold">Name</th>
            <th className="py-4 text-gray-700 font-semibold">Usage</th>
            <th className="py-4 text-gray-700 font-semibold">Key</th>
            <th className="py-4 text-right text-gray-700 font-semibold">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {apiKeys.map(k => {
            const isVisible = visibleKeys[k.id];
            return (
              <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 font-medium text-gray-900">{k.label}</td>
                <td className="py-4 text-gray-600">{k.usage}</td>
                <td className="py-4 font-mono text-sm select-all">
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-800">
                    {isVisible ? k.key : "\u2022".repeat(k.key.length)}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button 
                      className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors" 
                      title={isVisible ? "Hide" : "Show"} 
                      onClick={() => onToggleVisible(k.id)}
                    >
                      <EyeIcon />
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition-colors" 
                      title="Copy" 
                      onClick={() => onCopy(k.key)}
                    >
                      <CopyIcon />
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition-colors" 
                      title="Edit" 
                      onClick={() => onEdit(k.id)}
                    >
                      <EditIcon />
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors" 
                      title="Delete" 
                      onClick={() => onDelete(k.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get user session data
  const { data: session, status } = useSession();
  
  // Debug: Log session data to console
  useEffect(() => {
    console.log('Session status:', status);
    if (session) {
      console.log('Session data:', session);
      console.log('User data:', session.user);
    }
  }, [session, status]);

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

  // Add safety check for session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          <TopBar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} user={session?.user || null} />
          <main className="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="text-gray-500 text-sm font-medium mb-2">Pages / Overview</div>
              <div className="text-3xl font-bold text-gray-900">Dashboard Overview</div>
            </div>
            
            <PlanCard />
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                {error}
              </div>
            )}
            
            {loading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              </div>
            )}
            
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
    </ProtectedRoute>
  );
} 