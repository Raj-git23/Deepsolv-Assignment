import React, { useEffect, useState } from "react";
import Cards from "../components/Cards"; 

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  // ---------------------- Fetching favorite Pokémon from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Favorite Pokémon</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet! Add some Pokémon to your favorites.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((pokemon, index) => (
            <Cards
              key={index}
              image={pokemon.image}
              title={pokemon.title}
              type={pokemon.type}
              region={pokemon.region}
              gender={pokemon.gender}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
