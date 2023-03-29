import React, { useContext, useEffect, useState } from 'react'
import { urlContext } from '../../App';

export default function Seach() {

    const [contextUrl, setContextUrl] = useContext(urlContext);

    const [urlHandler, setUrlHandler]  = useState('');

    const [submitedValue, setSubmitedValue] = useState(0);
    
    const handleName = (event) => {
      let aux =  event.target.value.toLowerCase();
      setUrlHandler(aux);
    }

    const handleSubmit = (event) => { 
      setSubmitedValue ( submitedValue+1);
      setContextUrl(urlHandler);
      console.log(urlHandler);
      console.log(contextUrl);
      event.preventDefault();
      
    }
    
    useEffect(() => {
      setContextUrl(urlHandler);
    },[submitedValue])


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
