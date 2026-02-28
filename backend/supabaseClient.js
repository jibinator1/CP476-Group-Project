/**
 * Supabase client for browser. Set window.__SUPABASE_URL__ and window.__SUPABASE_ANON_KEY__
 * before loading the app, or use supabaseConfig.js (copy from supabaseConfig.example.js).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const url = window.__SUPABASE_URL__ || '';
const anonKey = window.__SUPABASE_ANON_KEY__ || '';

if (!url || !anonKey) {
  console.warn('Supabase: Missing __SUPABASE_URL__ or __SUPABASE_ANON_KEY__. Use mock data or add supabaseConfig.js.');
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
