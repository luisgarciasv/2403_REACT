import {useContext, useEffect, useState} from 'react'
import { urlContext } from '../../App'
import MainPokemonCard from '../MainPokemonCard/MainPokemonCard'
import Seach from '../Search/Seach'

export default function Home() {

  const url = useContext(urlContext);

  return (
    <div>
      <Seach/>
    
    <MainPokemonCard/>
    </div>
  )
}
