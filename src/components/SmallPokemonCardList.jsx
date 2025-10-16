import SmallPokemonCard from "./SmallPokemonCard";

export function SmallPokemonCardList({ pokemonCardList }) {
  // console.log(pokemonCardList);
  return (
    <div className="small-pokemon-card-list">
      {pokemonCardList.map((card) => {
        return (
          <SmallPokemonCard
            key={`${card.name}CardKey`}
            pokeName={card.name}
          ></SmallPokemonCard>
        );
      })}
    </div>
  );
}
