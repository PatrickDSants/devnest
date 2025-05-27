// src/components/SearchBar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogIn, LogOut, User, Heart, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SearchBar({ query, setQuery }) {
  const [inputValue, setInputValue] = useState(query);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b-2 border-blue-600/30 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 shadow-md z-50">
      {/* Menu hambúrguer */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded hover:bg-zinc-800 transition"
        >
          <Menu size={24} className="text-white" />
        </button>

        {menuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden animate-fade-in z-50">
            <nav className="flex flex-col py-2">
              <Link to="/" onClick={() => setMenuOpen(false)} className={`px-4 py-2 hover:bg-zinc-800 transition ${location.pathname === "/" ? "bg-zinc-800" : ""}`}>
                <div className="flex items-center gap-2">
                  <Home size={18} /> Início
                </div>
              </Link>

              {user && (
                <>
                  <Link to="/perfil" onClick={() => setMenuOpen(false)} className={`px-4 py-2 hover:bg-zinc-800 transition ${location.pathname === "/perfil" ? "bg-zinc-800" : ""}`}>
                    <div className="flex items-center gap-2">
                      <User size={18} /> Perfil
                    </div>
                  </Link>

                  <Link to="/salvos" onClick={() => setMenuOpen(false)} className={`px-4 py-2 hover:bg-zinc-800 transition ${location.pathname === "/salvos" ? "bg-zinc-800" : ""}`}>
                    <div className="flex items-center gap-2">
                      <Heart size={18} /> Salvos
                    </div>
                  </Link>

                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-zinc-800 transition text-left">
                    <div className="flex items-center gap-2 text-red-400">
                      <LogOut size={18} /> Sair
                    </div>
                  </button>
                </>
              )}

              {!user && (
                <Link to="/login" onClick={() => setMenuOpen(false)} className={`px-4 py-2 hover:bg-zinc-800 transition ${location.pathname === "/login" ? "bg-zinc-800" : ""}`}>
                  <div className="flex items-center gap-2">
                    <LogIn size={18} /> Entrar
                  </div>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Campo de busca */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 mx-4 max-w-3xl flex"
        autoComplete="off"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar projetos open source..."
          className="w-full rounded-l-lg bg-zinc-800 px-4 py-2 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-r-lg border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white transition font-bold"
        >
          Buscar
        </button>
      </form>

      {/* Avatar + nome */}
      {user && (
        <div className="flex items-center gap-2">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700 hover:ring-blue-500 transition"
          />
          <span className="text-sm text-white truncate max-w-[120px]">
            {user.displayName || user.email}
          </span>
        </div>
      )}
    </div>
  );
}
