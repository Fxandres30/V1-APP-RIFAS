import { supabase } from "../supabase.js";

export async function getReferralProgress(userId) {
  // buscar referidos hechos por este usuario
  const { data: referrals } = await supabase
    .from("referrals")
    .select("referred_id, reward_given")
    .eq("referrer_id", userId);

  if (!referrals || referrals.length === 0) {
    return {
      dias: 0,
      rifas: 0,
      completo: false
    };
  }

  const referredIds = referrals.map(r => r.referred_id);

  // rifas creadas por los referidos
  const { data: rifas } = await supabase
    .from("rifas")
    .select("created_at, user_id")
    .in("user_id", referredIds);

  if (!rifas || rifas.length === 0) {
    return {
      dias: 0,
      rifas: 0,
      completo: false
    };
  }

  // contar días únicos
  const diasUnicos = new Set(
    rifas.map(r =>
      new Date(r.created_at).toISOString().split("T")[0]
    )
  );

  return {
    dias: diasUnicos.size,
    rifas: rifas.length,
    completo: diasUnicos.size >= 3
  };
}
