import { useContext } from "react";
import SmallPokemonCard from "../SmallPokemonCard/SmallPokemonCard";
import style from "./SmallPokemonCardList.module.css";
import { UrlContext } from "../AppContextProvider/AppContextProvider";
import usePokemonList from "../../hooks/usePokemonList";

export default function SmallPokemonCardList({
  pokemonQuantity = 20,
  startNumber = 0,
  typeGroup = undefined,
}) {
  const { contextUrl } = useContext(UrlContext);

  const { pokemonCardList, apiRes } = usePokemonList(
    pokemonQuantity,
    startNumber,
    typeGroup
  );

  if (!apiRes) {
    return;
  } else {
    return (
      <div className={style.pokeList}>
        {pokemonCardList.map((card) => {
          return (
            <SmallPokemonCard
              key={`${card.name}CardKey`}
              pokeName={card.name}
              isCurrent={card.name === contextUrl ? true : false}
            ></SmallPokemonCard>
          );
        })}
      </div>
    );
  }
}
