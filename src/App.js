import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const res = await fetch('https://api.github.com/users/guimariz/repos');

    const data = await res.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((i) => i.favorite);

    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map((i) => {
      return i.id === id ? { ...i, favorite: !i.favorite } : i;
    });

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul>
        {repositories.map((i) => (
          <li key={i.id}>
            {i.name}
            {i.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(i.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
