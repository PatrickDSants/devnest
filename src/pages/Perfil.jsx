import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import ParticleBackground from "../components/ParticleBackground";

export default function Perfil() {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage("Nome atualizado com sucesso!");
      setEditMode(false);
    } catch (err) {
      console.error("Erro ao salvar nome:", err);
      setMessage("Erro ao atualizar o nome.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 border-b border-cyan-500 pb-2 w-fit">
          Seu Perfil
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400 shadow"
          />

          <div className="flex-1 w-full">
            {editMode ? (
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-lg w-full mb-2 text-white"
              />
            ) : (
              <p className="text-xl font-semibold">{displayName || "Usuário sem nome"}</p>
            )}
            <p className="text-zinc-400">{user.email}</p>
          </div>
        </div>

        {message && (
          <p className={`mt-4 ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setDisplayName(user.displayName || "");
                }}
                className="px-6 py-3 bg-zinc-600 text-white rounded-lg font-bold hover:bg-zinc-700 transition"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Editar Nome
            </button>
          )}

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
