import { supabase } from './supabaseClient';

// Fetch all API keys
export async function fetchApiKeys() {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .order("label");
  
  if (error) throw error;
  return data || [];
}

// Create a new API key
export async function createApiKey(label, limit) {
  const key = "tvly-" + Math.random().toString(36).substring(2, 18);
  
  const { data, error } = await supabase
    .from("api_keys")
    .insert([{ 
      label, 
      key, 
      usage: 0, 
      limit: limit ? parseInt(limit) : null 
    }])
    .select();
  
  if (error) throw error;
  return data[0];
}

// Update an API key
export async function updateApiKey(id, updates) {
  const { data, error } = await supabase
    .from("api_keys")
    .update(updates)
    .eq("id", id)
    .select();
  
  if (error) throw error;
  return data[0];
}

// Delete an API key
export async function deleteApiKey(id) {
  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id);
  
  if (error) throw error;
  return true;
} 

// Verify an API key
export async function verifyApiKey(key) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("id")
    .eq("key", key)
    .single();
  if (error || !data) return false;
  return true;
} 