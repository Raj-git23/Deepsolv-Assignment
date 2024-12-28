import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 12; // Number of Pokémon per page


  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
        const data = await response.json();

        // Fetch detailed data for each Pokémon
        const pokemonDetails = await Promise.all(

          data.results.map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();
            
            return {
              name: capitalizeFirstLetter(pokeData.name), 
              image: pokeData.sprites.other['official-artwork'].front_default, 
              type: capitalizeFirstLetter(pokeData.types.map((type) => type.type.name).join(', ')), 
              gender: pokeData.gender || 'Unknown',
              region: pokeData.generation ? pokeData.generation.name : 'Unknown', 
            };
          })
        );

        setPokemonList(pokemonDetails);
        setTotalPages(Math.ceil(data.count / itemsPerPage)); // Calculate total pages
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage]); // Fetch data when the page changes

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        {pokemonList.map((pokemon, index) => (
          <Cards
            key={index}
            image={pokemon.image}
            title={pokemon.name}
            type={pokemon.type}
            region={pokemon.region}
            gender={pokemon.gender}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center my-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className="px-4 text-black rounded-md mr-4 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 text-black rounded-md ml-4 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
