import React, { useState, useEffect } from "react";
import { IoMale, IoFemale } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuHeart } from "react-icons/lu"; // For the heart icon

const Cards = ({ image, title, type, gender }) => {
  const [isFav, setIsFav] = useState(false);


  // ------------------------- Checking if the Pokémon is a favorite when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavo = favorites.some((pokemon) => pokemon.title === title);
    setIsFav(isFavo);
  }, [title]);



  // -------------------------- Function to handle the click event on the heart icon
  const handleClick = () => {
    setIsFavorite(!isFav);

    // Get the current Pokémon card data
    const pokemonData = {
      image,
      title,
      type,
      region,
      gender,
    };

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];


    // ------------------------- Check if it's already in the favorites
    if (!favs.some((pokemon) => pokemon.title === title)) {
      favs.push(pokemonData);
    } else {
      favs = favs.filter((pokemon) => pokemon.title !== title);
    }

    // ----------------------------- Update the localStorage with the new favorites list
    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <>
      <div className="flex">
        <div className="relative cursor-pointer m-4 border-2 border-[#6c6565c9] hover:drop-shadow-lg rounded-xl group">
          <div className="absolute z-10 top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <LuHeart
              className={`text-2xl ${
                isFav ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
              onClick={handleClick}
            />
          </div>
          
          <Link to={`/pokemon/${title}`} state={{ img: image }}>
          
          <img
            src={image}
            className="rounded-xl w-64 h-64 object-cover drop-shadow-[3px_8px_6px_rgba(0,0,2,0.5)] hover:scale-105 transition-transform duration-300 ease-in-out"
            alt={title}
          />          

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

            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cards;
