import apiCall from "../apiCall";
import { useEffect } from "react";
import { useState } from "react";
import loadingGif from "../img/loading.gif";

export default function FilterCard({ pokemon }) {
  const [pokemonDetail, setPokemonDetail] = useState({
    name: "loading ...",
    sprites: { other: { "official-artwork": { front_default: loadingGif } } },
  });

  const getPokemonDetail = () => {
    apiCall("pokemon/" + pokemon.name).then((res) => setPokemonDetail(res));
  };

  useEffect(() => {
    getPokemonDetail();
  }, [pokemon.url]);

  return (
    <div className="d-inline-flex col-2">
      <div className="card m-2">
        <div className="card-header">
          <h2>{pokemonDetail.name}</h2>
        </div>
        <div className="card-body">
          <img
            alt={pokemonDetail.name}
            className="img-fluid"
            src={pokemonDetail.sprites.other["official-artwork"].front_default}
          />
        </div>
      </div>
    </div>
  );
}
