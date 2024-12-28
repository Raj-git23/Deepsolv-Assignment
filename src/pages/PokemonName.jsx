import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const PokemonName = () => {
  const { name } = useParams(); 
  const location = useLocation();
  const { img } = location.state || {}; 

  const [pokemonDetails, setPokemonDetails] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

 
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details");
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  // Display loading or error message if needed
  if (loading) return <p>Loading Pokémon details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center">
        {img && <img src={img} alt={name} className=" mb-4" />}
        <h1 className="text-8xl font-bold mb-4 pl-16">{name}</h1>
      </div>
      <div className="flex flex-col justify-center">
        {pokemonDetails && (
          <div className="border p-6 rounded shadow-lg pl-10">
            <h2 className="text-4xl font-semibold">Details:</h2>
            <div className="grid grid-cols-2 pl-10 gap-2 my-4">
              <p className="text-lg mt-2">
                <strong>Type:</strong>{" "}
                {pokemonDetails.types.map((type) => type.type.name).join(", ")}
              </p>
              <p className="text-lg mt-2">
                <strong>Height:</strong> {pokemonDetails.height / 10} m
              </p>
              <p className="text-lg mt-2">
                <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
              </p>
              <p className="text-lg mt-2">
                <strong>Abilities:</strong>{" "}
                {pokemonDetails.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              <p className="text-lg mt-2">
                <strong>Base Experience:</strong>{" "}
                {pokemonDetails.base_experience}
              </p>
              <p className="text-lg mt-2">
                <strong>Stats:</strong>
              </p>
            
            <ul className="grid grid-cols-2 gap-4">
              {pokemonDetails.stats.map((stat) => (
                <li key={stat.stat.name} className="text-lg space-y-2">
                  <span className="font-bold">{stat.stat.name.toUpperCase()}</span>: {stat.base_stat}
                </li>
              ))}
            </ul></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonName;
