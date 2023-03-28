import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export default function Seach() {

    const [urlName, setUrlName] = useState('')
  
    const urlContext = createContext(urlName);

    const [pokemonDetail,setPokemonDetail] = useState([{
        
    }]);

    const getPokemons = () =>{

        axios.get('https://pokeapi.co/api/v2/pokemon/' + urlName)
        .then( (response) => {
            setPokemonDetail(response.data)
            console.log(response.data)
            //console.log(pokemonDetail)
            })
    }

    const handleName = (event) => {
      let aux =  event.target.value.toLowerCase();
      setUrlName(aux);
    }

    const handleSubmit = (event) => { 
      
      console.log(urlName);
      getPokemons();
      event.preventDefault();
    }


    return (

        <div className="card">
        <div className="card-header text-dark">
          Busca tu Pokemon</div>
        <div className="card-body">
          <form >

            <input type="text" 
            placeholder="Nombre Pokemon"
            onChange={handleName}
            />  <br />
            <button type="submit" 
            className="btn btn-success" 
            onClick={handleSubmit}
            >Buscar</button>
          </form>
        </div>
      </div>
  )
}
