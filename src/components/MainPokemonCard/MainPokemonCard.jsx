import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { submitContext, urlContext } from '../../App';
import arrowPrev from '../img/arrow-previous.svg';
import arrowNext from '../img/arrow-next.svg';


export default function MainPokemonCard() {

    const [contextUrl, setContextUrl] = useContext(urlContext);

    const [contextSubmit, setContextSubmit] = useContext(submitContext);
  
    const [pokemonDetail, setPokemonDetail] = useState(null);

    const [pokemonNumbers, setPokemonNumbers] = useState({
        current: '',
        previous: '',
        next: ''
    });

    const [footerSprite, setFooterSprite] = useState({
        prevSprite : '',
        nextSprite : '',
        prevName : '',
        nextName : ''
    });

    function checkGeneration (id) {
        if (id > 0 && id <= 151 ){
            return 'Generation 1';
        }else if (id > 151 && id <= 251 ){
            return 'Generation 2';
        }else if (id > 251 && id <= 386 ){
            return 'Generation 3';
        }else if (id > 386 && id <= 493 ){
            return 'Generation 4';
        }else if (id > 493 && id <= 649 ){
            return 'Generation 5';
        }else if (id > 649 && id <= 721 ){
            return 'Generation 6';
        }else if (id > 721 && id <= 809 ){
            return 'Generation 7';
        }else if (id > 809 && id <= 905 ){
            return 'Generation 8';
        }else if (id > 905 && id <= 1010 ){
            return 'Generation 9';
        }else{
            return;
        }
    }

    function capitalizeName (name){
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function getTotalStat (){
        return ((pokemonDetail.stats[0].base_stat) + 
        (pokemonDetail.stats[1].base_stat) + 
        (pokemonDetail.stats[2].base_stat) +
        (pokemonDetail.stats[3].base_stat) + 
        (pokemonDetail.stats[4].base_stat) + 
        (pokemonDetail.stats[5].base_stat))
    }

    //function clearImput
    
    const getPokemons = async(url) =>{

            if (contextSubmit === 0){
                
            }else if (contextUrl === '' && contextSubmit !== ''){
                alert("Ingresa un nombre o numero Pokemon.")
            }else {
                await axios.get('https://pokeapi.co/api/v2/pokemon/' + url)
                .then( (response) => {
                    console.log(response.data)
                    setPokemonDetail(response.data);
                    setPokemonNumbers({current: response.data.id, previous: response.data.id -1, next: response.data.id+1});
                    //getSprites(response.data.id-1, response.data.id+1);
                    getSpritesFooter(response.data.id-1, response.data.id+1);
                }).catch((error) => {
                    alert("El nombre o numero Pokemon no existe.");
                    console.log(error);
                })
            }
        }


    const getSpritesFooter = async(urlPrev,urlNext) =>{
        console.log(urlPrev)
        console.log(urlNext)
        
        if (urlPrev === 0){
            await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlNext)
            .then((response) => {
                setFooterSprite({nextSprite : response.data.sprites.front_default,
                nextName : response.data.name
                })
            })
        } else if (urlNext === 1011){
            await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlPrev)
            .then((response) => {
                setFooterSprite({prevSprite : response.data.sprites.front_default,
                    prevName : response.data.name
                })
            })
        } else {
            axios.all(
                [await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlPrev),
                await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlNext)]
            ).then((response) =>{
            console.log(response)
            setFooterSprite({prevSprite: response[0].data.sprites.front_default , 
                nextSprite: response[1].data.sprites.front_default ,
                prevName : response[0].data.name,
                nextName : response[1].data.name
            });

            //console.log(footerSprite)
            })
        }
        }
    

    useEffect(() => {
      getPokemons(contextUrl);
    
    }, [contextSubmit])

    useEffect(() => {
        setContextSubmit(0)
    }, [] )


    if (contextSubmit === null || pokemonDetail === null){
        return null;
    }else if (contextSubmit === null && pokemonDetail === null){
        return null;
    }else{    
        return (
            <div >
                <div className="card col-8 rounded mx-auto" style={{border: '10px solid black'}}>
                    <div className="card-header d-inline-flex">
                        <div className="col-2 text-start">#{pokemonDetail.id}</div>
                        <div className="col-8">{capitalizeName(pokemonDetail.name)}</div>
                        <div className="col-2 text-end">{checkGeneration(pokemonNumbers.current)}</div>
                    </div>
                    <div className="card-doby d-inline-flex ">
                        <div className="col-3 text-center align-self-center">
                            <p>Type</p> 
                            <button className={ `btn${pokemonDetail.types[0].type.name}` }>
                                {capitalizeName(pokemonDetail.types[0].type.name) } 
                            </button><br/> 
                            {pokemonDetail.types.length === 1 ? <></> : 
                            (<button className={ `btn${pokemonDetail.types[1].type.name}` }>
                            {capitalizeName(pokemonDetail.types[1].type.name) } 
                            </button>)} <br/>
                            
                        </div>
                        <div className="col-6 d-flex">
                            <img  className='img-fluid p-4 mx-auto my-auto' src={pokemonDetail.sprites.other['official-artwork'].front_default} alt={pokemonDetail.name}/>
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
                            Total: {getTotalStat()} <br />
                            <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Total stats' aria-valuenow='60' aria-valuemin='0' aria-valuemax='750'>
                            <div className='progress-bar bg-dark' style={{width : (getTotalStat()/750)*100 + '%'}}></div>
                            </div><br />
                            
                        </div>
                        
                    </div>
                    <div className="card-footer d-inline-flex justify-content-center">
                        {pokemonNumbers.current > 1 && (
                            <div className='card col-4 mx-4 bg-light ' 
                            style={{cursor : 'pointer'}}
                            onClick={() => {setContextUrl(pokemonNumbers.previous)
                                ; 
                            setContextSubmit(contextSubmit+1)}}> 
                                <div className="row d-flex align-items-center justify-content-center">
                                    <img className='me-2'  src={arrowPrev} style={{height: 30, width: 'auto', padding : 0, margin:0}} alt='previous icon'/>
                                    <img style={{height: 60, width: 'auto', padding : 0, margin:0 }} src={footerSprite.prevSprite} alt={footerSprite.prevName}/>
                                #{pokemonNumbers.previous}
                                </div>
                            </div>
                        )}
                        {pokemonNumbers.current < 1010 && (
                            <div className='card col-4 mx-4 bg-light' 
                            style={{cursor : 'pointer'}}
                            onClick={() => {setContextUrl(pokemonNumbers.next)
                                ; 
                            setContextSubmit(contextSubmit+1)}}> 
                                <div className="row d-flex align-items-center justify-content-center">
                                    <img style={{height: 60, width: 'auto', padding : 0, margin:0 }} src={footerSprite.nextSprite} alt={footerSprite.nextName}/>  
                                #{pokemonNumbers.next}
                                <img className='ms-3'  src={arrowNext} style={{height: 30, width: 'auto', padding : 0, margin:0}} alt='next icon'/>
                                </div>
                            </div>
                        )}

                        
                    </div>
                </div>
            </div>
        )
        }
    
    
  
}
