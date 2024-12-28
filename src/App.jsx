import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Favourites from "./pages/Fav";
import Search from "./pages/Search";
import SearchBar from "./components/SearchBar";
import PokemonName from "./pages/PokemonName";


function App() {
  return (
    <div className="relative flex">
    <SideBar />
      <div className="w-full relative text-black h-screen overflow-auto">
        <SearchBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/pokemon/:name" element={<PokemonName />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
