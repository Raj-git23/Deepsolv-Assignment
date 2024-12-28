import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";

const Filter = () => {
  const [types, setTypes] = useState([]); 
  const [selectedType, setSelectedType] = useState(""); 
  const [pokemonList, setPokemonList] = useState([]);

  // Fetch Pokémon types
  const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    if (response.ok) {
      const data = await response.json();
      setTypes(data.results);
    } else {
      console.error("Error fetching data:", response.status);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Pokémon by selected type
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPokemonList([]); 

    if (type) {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((data) => {
          const pokemons = data.pokemon.map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }));
          setPokemonList(pokemons);
        })
        .catch((error) => console.error("Error fetching Pokemon:", error));
    }
  };

  return (
    <div className="p-2">

      {/* Dropdown for Pokémon types */}
      <select
        id="type-select"
        value={selectedType}
        onChange={(e) => handleTypeChange(e.target.value)}
        className="m-3 text-lg p-2"
      >
        <option value="">Type</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>

      {/* Render Pokémon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {pokemonList.map((pokemon) => (
          <Cards
            key={pokemon.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
              .split("/")
              .slice(-2, -1)}.png`}
            title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            type={selectedType}
            region="Unknown"
            gender="Unknown"
          />
        ))}
      </div>


      {pokemonList.length === 0 && selectedType && (
        <p className="m-2">No Pokémon found for this type.</p>
      )}
    </div>
  );
};

export default Filter;
