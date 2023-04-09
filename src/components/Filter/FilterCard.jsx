import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import loadingGif from '../img/loading.gif'

export default function FilterCard({pokemonUrl}) {

    const [pokemonDetail, setPokemonDetail] = useState({
        name : '',
        sprites: { other: {'official-artwork' :{front_default : loadingGif}}}
    });
    

    const getPokemonDetail = (url) => {
          axios.get(url)
        .then((response) => {
            setPokemonDetail(response.data)
        
        })
    }
    
    useEffect(() => {
        getPokemonDetail(pokemonUrl.url);
    },[pokemonUrl.url])

  return (
    <div className='d-inline-flex col-2'>
        <div className="card m-2">
            <div className="card-header">{pokemonDetail.name}</div>
            <div className="card-body">
                 <img alt={pokemonDetail.name} className='img-fluid'
                src={pokemonDetail.sprites.other['official-artwork'].front_default}/> 
            </div>
        </div>
    </div>
  )
}
