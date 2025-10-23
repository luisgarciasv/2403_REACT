import { useState, useContext, useEffect } from "react";
import { bgContext } from "../../App";
import Filter from "../Filter/Filter";
import MainPokemonCard from "../MainPokemonCard/MainPokemonCard";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import searchIcon from "../img/search-icon.svg";
import filterIcon from "../img/filter-icon.svg";

import { SmallPokemonCardList } from "../SmallPokemonCardList/SmallPokemonCardList";
import apiCall from "../../helpers/apiCall";

export default function Home() {
  const [contextBg, setContextBg] = useContext(bgContext);
  const [renderSearch, setRenderSearch] = useState(false);
  const [renderFilter, setRenderFilter] = useState(false);

  const handleClickSearch = () => {
    setRenderSearch(true);
    setRenderFilter(false);
    setContextBg(null);
  };

  const handleClickFilter = () => {
    setRenderFilter(true);
    setRenderSearch(false);
    setContextBg(null);
  };

  ////// testing /////

  // const [testPokeList, setTestPokeList] = useState({});
  // const [loadedPokeList, setLoadedPokeList] = useState(false);

  // useEffect(() => {
  //   apiCall("/pokemon").then((res) => {
  //     setTestPokeList(res.results);
  //     setLoadedPokeList(true);
  //   });
  // }, []);

  return (
    <div>
      <div className="home-header">
        <h1 className="main-title">Pokedex</h1>
        <img
          src={searchIcon}
          alt="search icon"
          role="button"
          title="Search"
          onClick={handleClickSearch}
        />
        <img
          src={filterIcon}
          alt="filter icon"
          role="button"
          title="Filter"
          onClick={handleClickFilter}
        />
      </div>
      <div className="card">
        {renderSearch ? (
          <>
            <Search /> <MainPokemonCard />
          </>
        ) : (
          <></>
        )}
        {renderFilter ? <Filter /> : <></>}
      </div>

      {/* {loadedPokeList && (
        <SmallPokemonCardList
          pokemonCardList={testPokeList}
        ></SmallPokemonCardList>
      )} */}

      <Footer />
    </div>
  );
}
