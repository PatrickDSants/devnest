import { FaGithub } from "react-icons/fa";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function ProjectCard({
  name,
  description,
  language,
  tags,
  url,
  estaSalvo,
  toggleSalvar,
}) {
  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-blue-600 hover:shadow-[0_0_12px_#1e40af55] transition p-5 flex flex-col h-full">
      {/* Header com nome e botões */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-white leading-snug break-words">{name}</h3>
        <div className="flex gap-2 items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            <FaGithub size={20} />
          </a>
          <button onClick={toggleSalvar} aria-label="Salvar projeto">
            {estaSalvo ? (
              <BookmarkCheck size={20} className="text-green-400 hover:text-green-300" />
            ) : (
              <Bookmark size={20} className="text-zinc-500 hover:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Descrição */}
      <p className="text-zinc-400 text-sm mb-4 line-clamp-4 whitespace-pre-wrap break-words">
        {description || "Este projeto não possui descrição."}
      </p>

      {/* Tags e linguagem */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-blue-900 text-blue-300 tracking-tight"
          >
            #{tag}
          </span>
        ))}
        {language && (
          <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            {language}
          </span>
        )}
      </div>
    </div>
  );
}
