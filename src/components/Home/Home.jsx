import React from 'react'
import MainPokemonCard from '../MainPokemonCard/MainPokemonCard'
import Seach from '../Search/Seach'

export default function Home() {
  return (
    <div>
      <div className='row'><Seach/></div>
    
    <MainPokemonCard/>
    </div>
  )
}
