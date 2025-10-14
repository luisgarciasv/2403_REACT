export function checkGeneration(id) {
  
  const generations = [
    { max: 151, name: "Generation 1" },
    { max: 251, name: "Generation 2" },
    { max: 386, name: "Generation 3" },
    { max: 493, name: "Generation 4" },
    { max: 649, name: "Generation 5" },
    { max: 721, name: "Generation 6" },
    { max: 809, name: "Generation 7" },
    { max: 905, name: "Generation 8" },
    { max: 1010, name: "Generation 9" },
  ];

  for (const gen of generations) {
    if (id <= gen.max) {
      return gen.name;
    }
  }

  return "Undefined";

  }

export function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

export function getTotalStat(pokemonDetail) {
    return (
      pokemonDetail.stats[0].base_stat +
      pokemonDetail.stats[1].base_stat +
      pokemonDetail.stats[2].base_stat +
      pokemonDetail.stats[3].base_stat +
      pokemonDetail.stats[4].base_stat +
      pokemonDetail.stats[5].base_stat
    );
  }

export function zeroFormat(id) {
    let prefix = "";

    switch (true) {
      case id < 10:
        prefix = "000";
        break;
      case id < 100:
        prefix = "00";
        break;
      case id < 1000:
        prefix = "0";
        break;
      default:
        prefix = "";
    }

    return `#${prefix}${id}`;
  }