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
            console.log(types);
        })
    }

    const clickType = async (event) => { 
        if(event.target.getAttribute('isselected') === 'false'){
            event.target.setAttribute('isselected','true');
            setSelectedFilters(selectedFilters +1);
        } else if(event.target.getAttribute('isselected') === 'true'){
            event.target.setAttribute('isselected','false');
            setSelectedFilters(selectedFilters - 1);}
        let aux = event.target.getAttribute("data-url")
        
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
    

    return (
        <div>
            <div className='card d-block'>
                {types.map((type, index) =>
                    <button 
                        key={index}
                        data-url={type.url}
                        className={ `btn${type.name}` }
                        onClick={clickType}
                        isselected = 'false'>
                        {type.name}
                    </button>
                )}
            </div>

            {selectedFilters > 0 && selectedFilters < 3 ?  
                <div className='card d-block'>
                    {pokeList.map((pokemon, index) => 
                    <FilterCard pokemonUrl={pokemon.pokemon} key={index}/>
                    )}
                </div>
            : <></>}
        </div>
        
    )
  
    /*return(
        <div className='card d-block'>
            {pokeList.map((pokemon, index) => 
                <FilterCard pokemonUrl={pokemon.pokemon} key={index}/>
            )
            
            }
        </div>
    )*/
}

