import React from 'react';
import Cards from '../components/Cards';

const PokemonList = ({ pokemonData }) => {
  return (
    <div className="flex flex-wrap justify-center">
      
      {pokemonData.map((data, index) => (
        <Cards
          key={index}
          image={data.image}
          title={data.name}
          type={data.type}
          gender={data.gender}
        />
      ))}

    </div>
  );
};

export default PokemonList;
