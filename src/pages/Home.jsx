import { useEffect, useState, useRef } from "react";
import { Github } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getSalvosDoUsuario,
  salvarRepositorio,
  removerRepositorio,
} from "../firebase/firestoreSalvos";
import ProjectCard from "../components/ProjectCard";
import ParticleBackground from "../components/ParticleBackground"; 

export default function Home({ query }) {
  const { user } = useAuth();
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [salvos, setSalvos] = useState([]);

  const observer = useRef();
  const lastRepoRef = useRef();

  useEffect(() => {
    const carregarSalvos = async () => {
      if (user) {
        const dados = await getSalvosDoUsuario();
        setSalvos(dados);
      } else {
        setSalvos([]);
      }
    };
    carregarSalvos();
  }, [user]);

  const fetchRepos = async () => {
    if (!query || loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/repos?q=${query}&page=${page}`);
      if (!res.ok) {
        const err = await res.json();
        if (res.status === 403) setError("Limite de requisições da API do GitHub atingido.");
        else if (res.status === 422) setError("Busca inválida ou sem resultados.");
        else setError(err.error || "Erro desconhecido.");
        setHasMore(false);
        return;
      }

      const data = await res.json();
      if (data.items.length === 0) {
        setHasMore(false);
      } else {
        setRepos((prev) => [...prev, ...data.items]);
      }
    } catch (err) {
      console.error("Erro ao buscar repositórios:", err);
      setError("Erro na busca");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    fetchRepos();
  }, [page, query]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastRepoRef.current) observer.current.observe(lastRepoRef.current);
  }, [loading, hasMore]);

  const estaSalvo = (id) => salvos.some((item) => item.id === id);

  const toggleSalvar = async (repo) => {
    if (!user) return;

    let atualizados;

    if (estaSalvo(repo.id)) {
      atualizados = salvos.filter((item) => item.id !== repo.id);
      await removerRepositorio(repo);
    } else {
      atualizados = [...salvos, repo];
      await salvarRepositorio(repo);
    }

    setSalvos(atualizados);
  };

  return (
    <div className="relative min-h-screen w-full text-white font-sans z-10 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 border-b border-cyan-500 pb-2 w-fit">
          Projetos para contribuir:
        </h1>

        {repos.length === 0 && !loading && (
          <p className="text-zinc-400">Nenhum projeto encontrado.</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo, i) => {
            const isLast = i === repos.length - 1;
            return (
              <div key={repo.id} ref={isLast ? lastRepoRef : null}>
                <ProjectCard
                  id={repo.id}
                  name={repo.full_name}
                  description={repo.description}
                  language={repo.language}
                  tags={repo.topics}
                  url={repo.html_url}
                  fullData={repo}
                  estaSalvo={estaSalvo(repo.id)}
                  toggleSalvar={() => toggleSalvar(repo)}
                />
              </div>
            );
          })}
        </div>

        {loading && <p className="text-zinc-500 mt-6">Carregando...</p>}
      </div>
    </div>
  );
}
