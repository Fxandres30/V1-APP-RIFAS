import { supabase } from "../supabase.js";

document.getElementById("registerBtn").addEventListener("click", async (e) => {
  e.preventDefault(); // 🔴 CLAVE

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;

    alert("Registro exitoso. Revisa tu correo si pide confirmación.");
    console.log(data);
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});
