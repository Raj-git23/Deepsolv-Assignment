import React, { useState, useEffect } from "react";
import { IoMale, IoFemale } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuHeart } from "react-icons/lu"; // For the heart icon

const Cards = ({ image, title, type, region, gender }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // ------------------------- Checking if the Pokémon is a favorite when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = favorites.some((pokemon) => pokemon.title === title);
    setIsFavorite(isFav);
  }, [title]);

  // -------------------------- Function to handle the click event on the heart icon
  const handleClick = () => {
    setIsFavorite(!isFavorite);

    // Get the current Pokémon card data
    const pokemonData = {
      image,
      title,
      type,
      region,
      gender,
    };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // ------------------------- Check if it's already in the favorites
    if (!favorites.some((pokemon) => pokemon.title === title)) {
      favorites.push(pokemonData);
    } else {
      favorites = favorites.filter((pokemon) => pokemon.title !== title);
    }

    // ----------------------------- Update the localStorage with the new favorites list
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
        <div className="flex">
          <div className="relative cursor-pointer m-4 border-2 border-[#d2e3e3b5] rounded-xl group">
            <img
              src={image}
              className="rounded-xl w-64 h-64 object-cover drop-shadow-[0px_3px_14px_rgba(10,10,10,0.1)] hover:scale-105 transition-transform duration-300 ease-in-out"
              alt={title}
            />

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <LuHeart
                className={`text-2xl ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={handleClick}
              />
            </div>
            <Link to={`/pokemon/${title}`} state={{ img: image }}>

            <div className="relative bottom-0 left-0 w-full bg-gradient-to-t bg-[#fff] border-2 border-[#d2e3e3b5] p-2 rounded-b-xl">
              <p className="text-[#0a8d75e0] text-2xl font-semibold">{title}</p>
              <p className="text-black/50 text-md">{type}</p>

              {gender === "m" ? (
                <p className="absolute right-1 top-6 text-xl text-black px-2">
                  <IoMale />
                </p>
              ) : (
                <p className="absolute right-1 top-6 text-xl text-black px-2">
                  <IoFemale />
                </p>
              )}

              <p className="text-black/50 text-sm">{region}</p>
            </div>
            </Link>
          </div>
        </div>
      
    </>
  );
};

export default Cards;
