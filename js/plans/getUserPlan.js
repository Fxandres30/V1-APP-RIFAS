import { supabase } from "../supabase.js";

export async function getUserPlan(userId) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_plans")
    .select(`
      *,
      plans (*)
    `)
    .eq("user_id", userId)
    .eq("is_active", true)
    .gte("end_date", now)
    .order("end_date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return { code: "free", has_ads: true, max_rifas: 3 };
  }

  return data.plans;
}
