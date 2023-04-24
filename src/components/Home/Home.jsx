import { useState, useContext } from 'react'
import { bgContext } from '../../App'
import Filter from '../Filter/Filter'
import MainPokemonCard from '../MainPokemonCard/MainPokemonCard'
import Seach from '../Search/Seach'
import Footer from '../Footer/Footer'
import searchIcon from '../img/search-icon.svg'
import filterIcon from '../img/filter-icon.svg'

export default function Home() {

  const [contextBg, setContextBg] = useContext(bgContext);
  const [renderSearch , setRenderSearch] = useState(false);
  const [renderFilter , setRenderFilter] = useState(false);

  const handleClickSearch = () => {
  
      setRenderSearch(true);
      setRenderFilter(false);
      setContextBg(null)
    
  }

  const handleClickFilter = () => {
    
      setRenderFilter(true);
      setRenderSearch(false);
      setContextBg(null)
    
  }

  return (
    <div  >
      <div className="home-header" >
        <h1 className='main-title'>Pokedex</h1>
        <img src={searchIcon} 
        alt="search icon" 
        role="button"
        title='Search'
        onClick={handleClickSearch}/>
        <img src={filterIcon} 
        alt="filter icon"
        role="button"
        title='Filter'
        onClick={handleClickFilter}/>
      </div>
      <div className="card">
      {renderSearch ? <><Seach/> <MainPokemonCard/></> : <></>}
      {renderFilter ? <Filter/> : <></>}
      
      </div>
  
     <Footer/>
    </div>
  )
}
