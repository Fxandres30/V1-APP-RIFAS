import { supabase } from "../supabase.js";

export async function checkReferralReward(referredUserId) {
  // 1️⃣ Ver si este usuario fue referido y aún no dio recompensa
  const { data: referral, error: refError } = await supabase
    .from("referrals")
    .select("*")
    .eq("referred_id", referredUserId)
    .eq("reward_given", false)
    .single();

  if (refError || !referral) {
    // No fue referido o ya dio recompensa
    return;
  }

  // 2️⃣ Contar días distintos con rifas
  const { data: rifas, error: rifasError } = await supabase
    .from("rifas")
    .select("created_at")
    .eq("user_id", referredUserId);

  if (rifasError || !rifas) return;

  const diasUnicos = new Set(
    rifas.map(r => r.created_at.split("T")[0])
  );

  // 3️⃣ Validar condición (3 días distintos)
  if (diasUnicos.size < 3) return;

  // 4️⃣ Dar recompensa al invitador (7 días premium con anuncios)
  const nuevaFecha = new Date();
  nuevaFecha.setDate(nuevaFecha.getDate() + 7);

  await supabase
    .from("profiles")
    .update({
      plan: "premium_ads",
      plan_expires_at: nuevaFecha
    })
    .eq("id", referral.referrer_id);

  // 5️⃣ Marcar recompensa como entregada
  await supabase
    .from("referrals")
    .update({ reward_given: true })
    .eq("id", referral.id);

  console.log("🎁 Recompensa por referido entregada");
}
