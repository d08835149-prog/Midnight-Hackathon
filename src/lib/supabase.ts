import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yrzajhwuhaxeomacnfde.supabase.co";
const supabaseKey = "sb_publishable_G5aB-SjZx1WHZpCkecwFmw_jt194kZ6";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);