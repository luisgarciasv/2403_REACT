import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { urlContext } from '../../App';

export default function Seach() {

    const [urlName, setUrlName] = useContext(urlContext);
  
    const [pokemonDetail,setPokemonDetail] = useState({


    });

    const getPokemons = () =>{

        axios.get('https://pokeapi.co/api/v2/pokemon/' + urlName)
        .then( (response) => {
            setPokemonDetail(response.data);
            //console.log(response.data);
            console.log(pokemonDetail)
            })
            .catch((error) => {
              alert('El nombre ingresado parece ser incorrecto :(')
            })
    }

    useEffect(() => {
      getPokemons();
    }, [pokemonDetail.name]) 
    
    const handleName = (event) => {
      let aux =  event.target.value.toLowerCase();
      setUrlName(aux);
    }

    const handleSubmit = (event) => { 
      setUrlName(urlName);
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
