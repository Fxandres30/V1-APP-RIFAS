import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://fhdakfeyaxxzmuyvnci.supabase.co";
const supabaseKey = "sb_publishable_SGQ5snuGTXnBq8_eHDghWQ_IWt8zOlU";

export const supabase = createClient(supabaseUrl, supabaseKey);
