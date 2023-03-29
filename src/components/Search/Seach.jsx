import React, { useContext, useEffect, useState } from 'react'
import { urlContext } from '../../App';
import { submitContext } from '../../App';

export default function Seach() {

    const [contextSubmit, setContextSubmit] = useContext(submitContext);

    const [contextUrl, setContextUrl] = useContext(urlContext);

    const [urlHandler, setUrlHandler]  = useState('');

    
    const handleName = (event) => {
      let aux =  event.target.value.toLowerCase();
      setUrlHandler(aux);
      setContextUrl(aux);
    }

    const handleSubmit = (event) => { 
      
      setContextUrl(urlHandler);
      console.log(urlHandler);
      console.log(contextUrl);
      event.preventDefault();
      setContextSubmit(contextSubmit + 1)
      
    }
    
    useEffect(() => {
      setContextUrl(urlHandler);
    },[contextSubmit])


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
