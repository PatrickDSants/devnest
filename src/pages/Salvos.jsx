// src/pages/Salvos.jsx
import { useEffect, useState } from "react";
import { Github, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ParticleBackground from "../components/ParticleBackground";

import {
  getSalvosDoUsuario,
  removerRepositorio,
} from "../firebase/firestoreSalvos";

import {
  adicionarFeito,
  getFeitosDoUsuario,
} from "../firebase/firestoreFeitos";

export default function Salvos() {
  const { user } = useAuth();
  const [salvos, setSalvos] = useState([]);
  const [feitos, setFeitos] = useState([]);
  const [draggingRepo, setDraggingRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const s = await getSalvosDoUsuario();
        const f = await getFeitosDoUsuario();
        setSalvos(s);
        setFeitos(f);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const remover = async (repo) => {
    try {
      await removerRepositorio(repo);
      setSalvos((prev) => prev.filter((r) => r.id !== repo.id));
    } catch (err) {
      console.error("Erro ao remover:", err);
    }
  };

  const handleDrop = async () => {
    if (draggingRepo) {
      try {
        setFeitos((prev) => [...prev, draggingRepo]);
        setSalvos((prev) => prev.filter((r) => r.id !== draggingRepo.id));
        await adicionarFeito(draggingRepo);
        await removerRepositorio(draggingRepo);
      } catch (err) {
        console.error("Erro ao mover para feitos:", err);
      } finally {
        setDraggingRepo(null);
      }
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-zinc-400">
        <h1 className="text-2xl font-bold mb-4">Seus projetos salvos</h1>
        <p>Faça login para visualizar seus projetos salvos.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 border-b border-cyan-500 pb-2 w-fit">
          Seus projetos salvos
        </h1>

        {loading ? (
          <p className="text-zinc-400">Carregando...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {salvos.map((repo, index) => (
              <div
                key={`salvo-${repo.id}-${index}`}
                draggable
                onDragStart={() => setDraggingRepo(repo)}
                className="bg-zinc-900 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-move"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold">{repo.full_name}</h2>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="text-blue-500 hover:text-blue-400" size={20} />
                    </a>
                    <button onClick={() => remover(repo)}>
                      <X className="text-red-500 hover:text-red-400" size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-zinc-400 mb-3">{repo.description}</p>
                <div className="flex flex-wrap gap-2">
                  {repo.topics?.map((topic, i) => (
                    <span
                      key={`salvo-tag-${repo.id}-${i}`}
                      className="bg-zinc-800 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      #{topic}
                    </span>
                  ))}
                  {repo.language && (
                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm">
                      {repo.language}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Zona de drop */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="mt-12 p-6 border-2 border-dashed border-green-400 rounded-xl min-h-[100px] flex items-center justify-center text-green-400"
        >
          Arraste aqui os repositórios que você concluiu.
        </div>

        {/* Feitos */}
        {feitos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-green-400 mb-6">Projetos Feitos</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {feitos.map((repo, index) => (
                <div
                  key={`feito-${repo.id}-${index}`}
                  className="bg-green-950 p-6 rounded-xl border border-green-700 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-green-300">
                      {repo.full_name}
                    </h2>
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                  <p className="text-green-300 mb-3">{repo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.topics?.map((topic, i) => (
                      <span
                        key={`feito-tag-${repo.id}-${i}`}
                        className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm"
                      >
                        #{topic}
                      </span>
                    ))}
                    {repo.language && (
                      <span className="bg-green-800 text-green-200 px-3 py-1 rounded-full text-sm">
                        {repo.language}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/"
          className="inline-block mt-12 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
