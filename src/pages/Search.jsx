import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Cards";

const Search = () => {
  const { searchTerm } = useParams();
  console.log(searchTerm);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="flex flex-col mb-24">
      <h2 className="flex ml-4 md:m-5 text-2xl md:text-5xl text-black mb-7">
        Showing results for {searchTerm}
      </h2>


      {pokemonData && (
        <Cards
          key={pokemonData.name}
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
          title={pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
          type={pokemonData.types.map((type) => type.type.name).join(", ")}
          region="Unknown"
          gender="Unknown"
        />
      )}
    </div>
  );
};

export default Search;
