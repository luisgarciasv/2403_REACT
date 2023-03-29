import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { urlContext } from '../../App';

export default function MainPokemonCard() {

    const [contextUrl, setContextUrl] = useContext(urlContext);
  
    const [pokemonDetail,setPokemonDetail] = useState({
        id: '',
        name:'',
        sprites: { other: {'official-artwork': { front_default: " "} } },
        types: [
            { type: {name: ''} },
            { type: {name: ''} }
        ],
        stats: [
            { 0: {base_stat: ''} },
            { 1: {base_stat: ''} },
            { 2: {base_stat: ''} },
            { 3: {base_stat: ''} },
            { 4: {base_stat: ''} },
            { 5: {base_stat: ''} },
        ] 
    });

    const [pokemonNumbers, setPokemonNumbers] = useState({
        current: 0,
        previous: '',
        next: ''
    });

    const getPokemons = () =>{

        axios.get('https://pokeapi.co/api/v2/pokemon/' + contextUrl)
        .then( (response) => {
            setPokemonDetail(response.data);
            setPokemonNumbers({current: response.data.id, previous: response.data.id -1, next: response.data.id+1});
            //console.log(response.data.id);
            console.log(pokemonDetail);
            console.log(pokemonNumbers);
            console.log(contextUrl);
            }).catch(() => {
                alert("nombre incorrecto");
            })
    }

    

    useEffect(() => {
      getPokemons();
    }, [contextUrl])

    
    if(pokemonDetail){
        return null;
    }else {
        
        return (
            <div>
                <div className="card col-8 rounded mx-auto" style={{border: '10px solid black'}}>
                    <div className="card-header d-inline-flex">
                        <div className="col-2 text-start">#{pokemonDetail.id}</div>
                        <div className="col-8">{pokemonDetail.name}</div>
                        <div className="col-2 text-end">Generation X</div>
                    </div>
                    <div className="card-doby d-inline-flex ">
                        <div className="col-3 text-center align-self-center">
                            Type: <br/> a <br/> Poison <br/>
                            Weakneses: <br/> 
                        </div>
                        <div className="col-6">
                            <img  className='img-fluid p-4' src={pokemonDetail.sprites.other['official-artwork'].front_default} />
                        </div>
                        <div className="col-3 text-center align-self-center pe-3">
                        
                            HP: {pokemonDetail.stats[0].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='HP stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[0].base_stat/255)*100 + '%'}}></div>
                            </div><br />
                            Attack: {pokemonDetail.stats[1].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Attack stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[1].base_stat/255)*100 + '%'}}></div>
                            </div> <br />
                            Defense: {pokemonDetail.stats[2].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Defense stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[2].base_stat/255)*100 + '%'}}></div>
                            </div><br />
                            Sp. Atk: {pokemonDetail.stats[3].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Special attack stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[3].base_stat/255)*100 + '%'}}></div>
                            </div><br />
                            Sp. Def: {pokemonDetail.stats[4].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Special defense stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[4].base_stat/255)*100 + '%'}}></div>
                            </div><br />
                            Speed: {pokemonDetail.stats[5].base_stat} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Speed stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                            <div className='progress-bar bg-dark' style={{width : (pokemonDetail.stats[5].base_stat/255)*100 + '%'}}></div>
                            </div><br />
                            Total: 500 <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Total stats' aria-valuenow='60' aria-valuemin='0' aria-valuemax='720'>
                            <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
                            </div><br />
                            
                        </div>
                        
                    </div>
                    <div className="card-footer d-inline-flex">
                        <div className="col-6">← #093</div>
                        <div className="col-6">#095 →</div>
                    </div>
                </div>
            </div>
          )
    }
  
}
