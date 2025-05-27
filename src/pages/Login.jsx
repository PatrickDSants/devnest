import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Github, User } from "lucide-react";
import { useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Falha no login. Tenta de novo!");
    }
  };

  useEffect(() => {
    document.title = "Login | DevNest";
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden flex items-center justify-center px-4">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-cyan-500 rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 border-b border-cyan-500 w-fit pb-2">
          Entrar no DevNest
        </h1>

        <p className="text-zinc-400 mb-6 text-sm">
          Acesse com uma conta para salvar projetos e marcar seus favoritos como concluídos.
        </p>

        <button
          onClick={() => handleLogin(new GoogleAuthProvider())}
          className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-medium mb-4 hover:bg-gray-200 transition"
        >
          <User size={20} />
          Entrar com Google
        </button>

        <button
          onClick={() => handleLogin(new GithubAuthProvider())}
          className="w-full flex items-center justify-center gap-3 bg-zinc-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-700 transition"
        >
          <Github size={20} />
          Entrar com GitHub
        </button>
      </div>
    </div>
  );
}
