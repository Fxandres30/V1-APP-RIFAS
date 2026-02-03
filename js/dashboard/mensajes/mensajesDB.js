import { supabase } from "../dashboard.js";

export async function guardarMensaje(mensaje) {
  const { data: { session } } = await supabase.auth.getSession();

  await supabase.from("mensajes").insert([{
    user_id: session.user.id,
    ...mensaje
  }]);
}

export async function obtenerMensajes() {
  const { data: { session } } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("mensajes")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}
