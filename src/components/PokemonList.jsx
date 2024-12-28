import React from 'react';
import Cards from '../components/Cards';

const PokemonList = ({ pokemonList }) => {
  return (
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
  );
};

export default PokemonList;
