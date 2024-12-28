import React, {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar"; // Use the provided SearchBar component
import { useParams } from "react-router-dom";

const Search = () => {

    const { searchTerm } = useParams();
    console.log(searchTerm);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchPokemon = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchPokemon();
        }, [searchTerm]);
    
        if (loading) {
            return <div>Loading...</div>;
        }
    
        if (error) {
            return <div>Error: {error.message}</div>;
        }
    

  return (
    <div className="flex flex-col mb-24">

      <h2 className="flex ml-4 md:m-5 text-2xl md:text-5xl text-black mb-7">Showing results for ... {searchTerm} </h2>
        Hiii
    </div>
  );
};

export default Search;
