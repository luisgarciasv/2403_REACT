import { useContext } from "react";
import { UrlContext } from "../AppContextProvider/AppContextProvider";
import { zeroFormat, capitalizeName } from "../../helpers/helpers";
import loadingGif from "../img/loading.gif";
import style from "./SmallPokemonCard.module.css";
import usePokemonDetail from "../../hooks/usePokemonDetail";

export default function SmallPokemonCard({ pokeName, isCurrent = false }) {
  const { setContextUrl } = useContext(UrlContext);

  const { pokemonDetail, apiRes } = usePokemonDetail(pokeName);

  if (!apiRes) {
    return <img src={loadingGif} style={{ width: 110 }} />;
  } else {
    return (
      <div
        className={`${style.small_pokemon_card} ${
          isCurrent ? style.current : ""
        }`}
        onClick={() => {
          if (isCurrent) {
          } else {
            setContextUrl(pokemonDetail.name);
          }
        }}
      >
        <img src={pokemonDetail.sprites.front_default} alt={pokeName} />
        <h3>{zeroFormat(pokemonDetail.id)}</h3>
        <p>{capitalizeName(pokemonDetail.name)}</p>
      </div>
    );
  }
}
