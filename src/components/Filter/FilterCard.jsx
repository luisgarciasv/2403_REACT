import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function FilterCard({pokemonUrl}) {

    const [pokemonDetail, setPokemonDetail] = useState({
        name : '',
        sprites: ''
    })

    const getPokemonDetail = async(url) => {
        await axios.get(url)
        .then((response) => {
            setPokemonDetail(response.data)
        })
    }
    
    useEffect(() => {
        getPokemonDetail(pokemonUrl);
    },[pokemonUrl])
    
  return (
    <div className='card-inline-flex'>
        <div className="card m-2">
            <div className="card-header">{pokemonDetail.name}</div>
            <div className="card-body">
                <img alt={pokemonDetail.name}
                src={pokemonDetail.sprites.other['official-artwork'].front_default}/>
                
            </div>
        </div>
    </div>
  )
}
