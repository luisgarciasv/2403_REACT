import React, { useContext, useEffect, useState } from 'react'
import { urlContext } from '../../App';
import { submitContext } from '../../App';


export default function Seach() {

    const [contextSubmit, setContextSubmit] = useContext(submitContext);
    const [contextUrl, setContextUrl] = useContext(urlContext);
    const [urlHandler, setUrlHandler]  = useState('');
    const [pokeNames, setPokeNames] = useState({});
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);


    const getPokeNames = async () => {
      let answer = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1010')
      let data = await answer.json();
      let newArray = data.results.map(x => x.name);
      //console.log(newArray);
      setPokeNames(newArray);
    }

    const clearInput = (event) =>{
      setActive(0);
      setFiltered([]);
      setIsShow(false);
    }

    const handleName = (event) => {
      const suggestions = pokeNames;
      const aux = event.target.value;
      const newFilteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(aux.toLowerCase()) > -1
      );
      setUrlHandler(aux)
      setActive(0);
      setFiltered(newFilteredSuggestions);
      setIsShow(true);
    }

    const onClick = (event) => {
      clearInput(event);
      const aux = event.target.innerText;
      setContextUrl(aux);
      setUrlHandler(aux);
      setContextSubmit(contextSubmit+1)    
    };

    const onKeyDown = event => {
      if (event.keyCode === 13) { // enter key
        if (urlHandler === '') {
          alert('Ingrese un nombre Pokemon')
        }else{
        setActive(0);
        setIsShow(false);
        setContextUrl (filtered[active]);
        setUrlHandler(filtered[active]);
        setContextSubmit(contextSubmit+1);
        clearInput(event);}
      }
      else if (event.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
      }
      else if (event.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
      }
    };

    

    const renderAutocomplete = () => {
      if (isShow && urlHandler) {
        if (filtered.length) {
          return (
            <ul className="autocomplete" >
              {filtered.map((suggestion, index) => {
                let className;
                if (index === active) {
                  className = "active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          return (
            <div className="no-autocomplete">
              <em>Not found</em>
            </div>
          );
        }
      }
      return <></>;
    } 
    
    useEffect(() => {
      setContextUrl(urlHandler);
      setTimeout(() => {
        setUrlHandler('')
      }, 100);
      
    },[contextSubmit])

    useEffect(()=>{
      getPokeNames();
    },[])

    return (
        <div className="card">
        <div className="card-header text-dark">
          Busca tu Pokemon</div>
        <div className="card-body">
         
            <input type="text"  className='col-4'
            placeholder="Nombre Pokemon"
            onChange={handleName}
            onKeyDown={onKeyDown}
            value={urlHandler}/>  
            {renderAutocomplete()}
          
        </div>
      </div>
  )
}
