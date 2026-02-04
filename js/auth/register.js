import { supabase } from "../supabase.js";

// ==============================
// 🔗 LEER REFERIDO DESDE LINK
// ==============================
const params = new URLSearchParams(window.location.search);
const refFromLink = params.get("ref"); // ?ref=CODIGO

// ==============================
// 🧠 GENERAR CÓDIGO DE REFERIDO
// ==============================
function generarCodigo(nombre) {
  const base = nombre
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 8);

  return base + Math.floor(100 + Math.random() * 900);
}

// ==============================
// 📝 REGISTRO
// ==============================
document.getElementById("registerBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const referralInput =
    document.getElementById("referralCode")?.value.trim() || null;

  if (!name || !email || !password) {
    alert("Completa todos los campos obligatorios");
    return;
  }

  try {
    // ==============================
    // 🔐 CREAR USUARIO AUTH
    // ==============================
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("No se pudo crear el usuario");

    // ==============================
    // 👤 GENERAR CÓDIGO ÚNICO
    // ==============================
    let referralCode;
    let existe = true;

    while (existe) {
      referralCode = generarCodigo(name);

      const { data: ref } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", referralCode)
        .maybeSingle();

      existe = !!ref;
    }

    // ==============================
    // 👤 CREAR / ACTUALIZAR PERFIL
    // ==============================
    await supabase.from("profiles").upsert({
      id: user.id,
      name,
      email,
      plan: "free",
      referral_code: referralCode
    });

    // ==============================
    // 🤝 PROCESAR REFERIDO
    // ==============================
    let referrerId = null;

    // desde link
    if (refFromLink) {
      const { data: refUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", refFromLink)
        .maybeSingle();

      if (refUser) referrerId = refUser.id;
    }

    // desde input manual
    if (!referrerId && referralInput) {
      const { data: refUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", referralInput)
        .maybeSingle();

      if (refUser) referrerId = refUser.id;
    }

    // guardar relación
    if (referrerId) {
      await supabase.from("referrals").insert({
        referrer_id: referrerId,
        referred_id: user.id
      });

      // 🔥 dejamos listo para premios futuros
      await supabase
        .from("profiles")
        .update({ referred_by: referrerId })
        .eq("id", user.id);
    }

    // ==============================
    // ✅ FIN
    // ==============================
    alert("Registro exitoso. Ya puedes iniciar sesión.");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});
