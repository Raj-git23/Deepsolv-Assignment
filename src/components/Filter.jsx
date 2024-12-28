import React from 'react';

const Filter = ({ types, selectedType, onSelect }) => {
  return (
    <div className="mb-4">
      <label htmlFor="type-select" className="mr-2 text-lg">Select Pokémon Type:</label>
      
      <select
        id="type-select"
        value={selectedType}
        onChange={(e) => onSelect(e.target.value)} 
        className="p-2"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
        
      </select>
    </div>
  );
};

export default Filter;
