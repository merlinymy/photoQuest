import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mofmbxhcodebxeshwjez.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZm1ieGhjb2RlYnhlc2h3amV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTY0MzksImV4cCI6MjA3NTc3MjQzOX0.uqS1RJqmyuC8xYVRtJOw4Q6aFCVmmYobeejYznI_4Hk";

export const supabase = createClient(supabaseUrl, supabaseKey);
