// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Perfil from "./pages/Perfil";
import Salvos from "./pages/Salvos";

export default function App() {
  const [query, setQuery] = useState("react");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
        
        <header className="sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800">
          <SearchBar query={query} setQuery={setQuery} />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home query={query} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/salvos"
              element={
                <PrivateRoute>
                  <Salvos />
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
