import { useContext, useEffect, useState } from "react";
import { submitContext, urlContext } from "../App";
import apiCall from "./apiCall";
import { zeroFormat, capitalizeName } from "../helpers/helpers";
import loadingGif from "./img/loading.gif";

export default function SmallPokemonCard({ pokeName }) {
  const [contextUrl, setContextUrl] = useContext(urlContext);
  const [contextSubmit, setContextSubmit] = useContext(submitContext);
  const [pokemonDetail, setPokemonDetail] = useState({});

  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState({});

  const getPokemon = (auxUrl) => {
    apiCall(auxUrl)
      .then((res) => {
        setPokemonDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPokemon("pokemon/" + pokeName);
  }, []);

  if (loading) {
    return <img src={loadingGif} style={{ width: 110 }} />;
  } else {
    return (
      <div
        className="small-pokemon-card"
        onClick={() => {
          setContextUrl(pokemonDetail.id);
          setContextSubmit(contextSubmit + 1);
        }}
      >
        <img src={pokemonDetail.sprites.front_default} alt={pokeName} />
        <h3>{zeroFormat(pokemonDetail.id)}</h3>
        <p>{capitalizeName(pokemonDetail.name)}</p>
      </div>
    );
  }
}
