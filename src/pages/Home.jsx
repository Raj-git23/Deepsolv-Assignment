import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import PokemonList from "../components/PokemonList";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const itemsPerPage = 12; 

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Fetch Pokémon types
  const fetchTypes = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      if (response.ok) {
        const data = await response.json();
        setTypes(data.results);
      } else {
        console.error("Error fetching types:", response.status);
      }
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  };

  // Fetch Pokémon based on type and pagination
  const fetchPokemons = async (type = "", page = 1) => {
    try {
      setLoading(true);
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
        (page - 1) * itemsPerPage
      }`;
      if (type) {
        url = `https://pokeapi.co/api/v2/type/${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      let pokemonDetails = [];
      if (type) {
        pokemonDetails = await Promise.all(
          data.pokemon.map(async (poke) => {
            const pokeResponse = await fetch(poke.pokemon.url);
            const pokeData = await pokeResponse.json();
            return {
              name: capitalizeFirstLetter(pokeData.name),
              image: pokeData.sprites.other["official-artwork"].front_default,
              type: capitalizeFirstLetter(
                pokeData.types.map((type) => type.type.name).join(", ")
              ),
              gender: pokeData.gender || "Unknown",
            };
          })
        );
      } else {
        pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();
            return {
              name: capitalizeFirstLetter(pokeData.name),
              image: pokeData.sprites.other["official-artwork"].front_default,
              type: capitalizeFirstLetter(
                pokeData.types.map((type) => type.type.name).join(", ")
              ),
              gender: pokeData.gender || "Unknown",
            };
          })
        );
      }

      setPokemonList(pokemonDetails);
      setTotalPages(Math.ceil(data.count / itemsPerPage)); 
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchPokemons(selectedType, currentPage);
  }, [selectedType, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div><Error /></div>;

  return (
    <div className="flex relative flex-col items-center">

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url(../../images/i.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
          opacity: 0.25,
          zIndex: -1, 
        }}
      />
      
      {/* TypeDropdown component */}
      <Filter
        types={types}
        selectedType={selectedType}
        onSelect={setSelectedType}
      />

      {/* PokemonList component */}
      <PokemonList pokemonData={pokemonList} />

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
      />
    </div>
  );
};

export default Home;
