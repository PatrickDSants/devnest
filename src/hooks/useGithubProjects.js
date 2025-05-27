import { useEffect, useState } from "react";

export default function useGithubProjects(query = "react", perPage = 6) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Exemplo: busca repositórios populares com a palavra 'react'
    fetch(
      `https://api.github.com/search/repositories?q=${query}+stars:>1000&sort=stars&order=desc&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query, perPage]);

  return { projects, loading, error };
}
