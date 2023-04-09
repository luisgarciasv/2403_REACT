import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Filter.css'
import FilterCard from './FilterCard';

export default function Filter() {

const [types, setTypes] = useState([
    {"name":"normal" , "url":"https://pokeapi.co/api/v2/type/1"}
]);
const [selectedFilters, setSelectedFilters] = useState(0);
const [selectedTypes, setSelectedTypes] = useState({
    type1 : '',
    type2 : ''
});
const [pokeList, setPokeList] = useState([
    {pokemon: {name : '', url : ''}}
]);

const getTypes = async () => {
    await axios.get('https://pokeapi.co/api/v2/type/?limit=18')
    .then((response) => {
        setTypes(response.data.results);
    })
}

const clickType = async (event) => { 
    let aux = event.target.getAttribute("data-url")
    setSelectedFilters(selectedFilters +1)
    setSelectedTypes({type1 : aux})
    await axios.get(aux)
    .then((response) => {
        console.log(response.data.pokemon)
        setPokeList(response.data.pokemon);
    })
    //console.log(event)
    //console.log(event.target.getAttribute("data-url"))
 }
     
useEffect(() => {
    getTypes();
}, [types.length])
 
if (selectedFilters === 0){
  return (
    <div className='card d-block'>
        {types.map((type, index) =>
        <button 
            key={index}
            data-url={type.url}
            className={ `btn${type.name}` }
            onClick={clickType}>
            {type.name}
        </button>)}
    </div>
  )}
  else {
    return(
        <div className='card d-block'>
            {pokeList.map((pokemon, index) => 
                <FilterCard pokemonUrl={pokemon.pokemon.url} key={index}/>
            )
            
            }
        </div>
    )
  }
}
