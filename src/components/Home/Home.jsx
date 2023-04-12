import { useState } from 'react'
import Filter from '../Filter/Filter'
import MainPokemonCard from '../MainPokemonCard/MainPokemonCard'
import Seach from '../Search/Seach'
import Footer from '../Footer/Footer'
import searchIcon from '../img/search-icon.svg'
import filterIcon from '../img/filter-icon.svg'

export default function Home() {

  const [renderSearch , setRenderSearch] = useState(false);
  const [renderFilter , setRenderFilter] = useState(false);

  const handleClickSearch = () => {
    if (renderSearch === false){
      setRenderSearch(true);
      setRenderFilter(false)
    } else {
      setRenderSearch(false);
      setRenderFilter(true)
    }
  }

  const handleClickFilter = () => {
    if (renderFilter === false){
      setRenderFilter(true);
      setRenderSearch(false)
    }else {
      setRenderFilter(false);
      setRenderSearch(true)
    }
  }

  return (
    <div  >
      <div className="card d-block " >
        
        <button className='btn col-1' onClick={handleClickSearch}>
          <img className='img-search' src={searchIcon} alt="search icon" />
          <p className='text-muted'>Search</p>
        </button>
        <button className='btn col-1' onClick={handleClickFilter}>
        <img className='img-filter' src={filterIcon} alt="filter icon" />
        <p className='text-muted'>Filter</p>
        </button>
        
      </div>
      <div className="card">
      {renderSearch ? <><Seach/> <MainPokemonCard/></> : <></>}
      {renderFilter ? <Filter/> : <></>}
      
      </div>
  
     <Footer/>
    </div>
  )
}
