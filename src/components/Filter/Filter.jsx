import { useEffect, useState } from "react";
import apiCall from "../../helpers/apiCall";
import FilterCard from "./FilterCard";

export default function Filter() {
  const [types, setTypes] = useState([]);
  // const [selectedFilters, setSelectedFilters] = useState(0);
  const [pokeList, setPokeList] = useState([]);

  const getTypes = () => {
    apiCall("type?limit=18")
      .then((res) => res.results)
      .then((types) => setTypes(types));
  };

  // const arrayIntersection = (typesArray) => {
  //   let array1 = [];
  //   let array2 = [];

  //   if (typesArray.type1 !== "" && typesArray.type2 === "") {
  //     axios.get(typesArray.type1).then((response) => {
  //       array1 = response.data.results;
  //       console.log(typesArray.type1);
  //       console.log(response);
  //     });
  //   } else if (typesArray.type1 !== "" && typesArray.type2 !== "") {
  //     console.log("case 2");
  //     /*let newArray = []
  //           typesArray.type1.map(function(item1){
  //               typesArray.type2.map(function(item2){
  //                 if(item1.key1 === item2.key2){
  //                   newArray.push(item2.key2);
  //                 }
  //               })})
  //               return newArray*/
  //   }
  //   return array1;
  // };

  const clickType = (event) => {
    let auxUrl = event.currentTarget.textContent;

    // if (!selectedFilters) {
    // event.currentTarget.setAttribute("is-selected", "true");
    // setSelectedFilters(selectedFilters + 1);
    apiCall("type/" + auxUrl).then((res) => setPokeList(res.pokemon));
    // } else {
    // }
    // let auxSelected = event.currentTarget.getAttribute("isselected");

    // if (auxSelected === "false") {
    //   event.currentTarget.setAttribute("isselected", "true");
    //   setSelectedFilters(selectedFilters + 1);
    //   await axios.get(auxUrl).then((response) => {
    //     //console.log(response.data.pokemon)
    //     setPokeList(response.data.pokemon);
    //   });
    //   if (selectedTypes.type1 === "") {
    //     setSelectedTypes({ type1: auxUrl });
    //   } else if (selectedTypes.type2 === "") {
    //     setSelectedTypes({ type2: auxUrl });
    //   }
    // } else if (event.currentTarget.getAttribute("isselected") === "true") {
    //   event.currentTarget.setAttribute("isselected", "false");
    //   setSelectedFilters(selectedFilters - 1);
    // }

    // arrayIntersection(selectedTypes);

    // function array intersection

    //console.log(event)
    //console.log(event.target.getAttribute("data-url"))
  };

  useEffect(() => {
    getTypes();
  }, [types.length]);

  return (
    <div>
      <div className="card d-block">
        {types.map((type, index) => (
          <button
            key={index}
            className={`btn${type.name}`}
            onClick={clickType}
            isselected="false"
          >
            {type.name}
          </button>
        ))}
      </div>

      {pokeList.length > 3 ? (
        <div className="card d-block">
          {pokeList.map((pokemon, index) => (
            <FilterCard pokemon={pokemon.pokemon} key={index} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  /*return(
        <div className='card d-block'>
            {pokeList.map((pokemon, index) => 
                <FilterCard pokemonUrl={pokemon.pokemon} key={index}/>
            )
            
            }
        </div>
    )*/
}
