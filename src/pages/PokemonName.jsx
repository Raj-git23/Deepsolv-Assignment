import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

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

  
  if (loading) return <p><Loader /></p>;
  if (error) return <p><Error /></p>;

  
  return (
    <div className="relative">
      <div className="flex flex-col w-full md:flex-row md:items-center">
        <img src={img} alt={name} />
        <h1 className="text-5xl min-[500px]:text-8xl font-bold mb-4 pl-2 sm:pl-4">
          {name}
        </h1>
      </div>
      

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${pokemonDetails.sprites.other["official-artwork"].front_default})`,
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: -1, 
        }}
      />

      <div className="flex flex-col mt-4 justify-center">
        {pokemonDetails && (
          <div className="sm:p-6 rounded shadow-lg pl-8 sm:pl-10">
            
            <h2 className="text-2xl sm:text-4xl font-semibold">Details:</h2>
            
            <div className="sm:grid grid-cols-2 pl-4 sm:pl-10 gap-2 my-4 sm:text-xl space-y-3 mt-2">
              
              <p>
                <span className="font-bold">Type:</span>{" "}
                {pokemonDetails.types.map((type) => type.type.name).join(", ")}
              </p>
              
              <p>
                <span className="font-bold">Height:</span>{" "}
                {pokemonDetails.height / 10} m
              </p>
              
              <p>
                <span className="font-bold">Weight:</span>{" "}
                {pokemonDetails.weight / 10} kg
              </p>
              
              <p>
                <span className="font-bold">Abilities:</span>{" "}
                {pokemonDetails.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              
              <p>
                <span className="font-bold">Base Experience:</span>{" "}
                {pokemonDetails.base_experience}
              </p>
            </div>
              
              <p className="text-xl pl-6 m-4">
                <span className="font-bold">Stats:</span>
              </p>

              <ul className="md:grid grid-cols-2 pl-16 pb-4 gap-4">
                
                {pokemonDetails.stats.map((stat) => (
                  <li key={stat.stat.name} className="sm:text-lg space-y-2">
                    <span className="font-bold">
                      {stat.stat.name.toUpperCase()}
                    </span>
                    : {stat.base_stat}
                  </li>
                ))}
              
              </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonName;
