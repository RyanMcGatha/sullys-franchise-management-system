import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// messaging channels
const roomOne = client.chanel("room1");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const chatOne = roomOne;
