import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { bgContext, submitContext, urlContext } from '../../App';
// import Color from 'color-thief-react'
import { useRef } from 'react';
import { FastAverageColor } from 'fast-average-color';

export default function MainPokemonCard() {

    const [contextUrl, setContextUrl] = useContext(urlContext);

    const [contextSubmit, setContextSubmit] = useContext(submitContext);

    const [contextBg, setContextBg] = useContext(bgContext);

    const [pokemonDetail, setPokemonDetail] = useState(null);

    const [pokemonNumbers, setPokemonNumbers] = useState({
        current: '',
        previous: '',
        next: ''
    });

    const [footerSprite, setFooterSprite] = useState({
        prevSprite: '',
        nextSprite: '',
        prevName: '',
        nextName: ''
    });

    let refColor = useRef(null);

    const fac = new FastAverageColor();

    function checkGeneration(id) {
        if (id > 0 && id <= 151) {
            return 'Generation 1';
        } else if (id > 151 && id <= 251) {
            return 'Generation 2';
        } else if (id > 251 && id <= 386) {
            return 'Generation 3';
        } else if (id > 386 && id <= 493) {
            return 'Generation 4';
        } else if (id > 493 && id <= 649) {
            return 'Generation 5';
        } else if (id > 649 && id <= 721) {
            return 'Generation 6';
        } else if (id > 721 && id <= 809) {
            return 'Generation 7';
        } else if (id > 809 && id <= 905) {
            return 'Generation 8';
        } else if (id > 905 && id <= 1010) {
            return 'Generation 9';
        } else {
            return;
        }
    }

    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function getTotalStat() {
        return ((pokemonDetail.stats[0].base_stat) +
            (pokemonDetail.stats[1].base_stat) +
            (pokemonDetail.stats[2].base_stat) +
            (pokemonDetail.stats[3].base_stat) +
            (pokemonDetail.stats[4].base_stat) +
            (pokemonDetail.stats[5].base_stat))
    }

    function zeroFormat(id) {
        let prefix = ''

        switch (true) {
            case id < 10:
                prefix = '000';
                break;
            case id < 100:
                prefix = '00';
                break;
            case id < 1000:
                prefix = '0';
                break;
            default:
                prefix = ''
        }


        return (`#${prefix}${id}`)

    }


    //function clearImput

    const getPokemons = async (url) => {

        if (contextSubmit === 0) {

        } else if (contextUrl === '' && contextSubmit !== 0) {

        } else {
            await axios.get('https://pokeapi.co/api/v2/pokemon/' + url)
                .then( response => response.data)
                .then( data => {
                    //console.log(data)
                    setPokemonDetail(data);
                    setPokemonNumbers({
                        current: data.id,
                        previous: data.id - 1,
                        next: data.id + 1
                    });
                    //getSprites(response.data.id-1, response.data.id+1);
                    getSpritesFooter(data.id - 1, data.id + 1);
                    setBackgroundColor(data.sprites.other['official-artwork'].front_default);
                }).catch((error) => {
                    alert("El nombre o numero Pokemon no existe.");
                    console.log(error);
                })
        }
    }

    const setBackgroundColor = async (sprite) => {
        await fac.getColorAsync(sprite)
            .then( res => {
                // console.log(res)
                refColor.current = res.hex;
                setContextBg(refColor.current)
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getSpritesFooter = async (urlPrev, urlNext) => {
        // console.log(urlPrev)
        // console.log(urlNext)

        if (urlPrev === 0) {
            await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlNext)
                .then((response) => {
                    setFooterSprite({
                        nextSprite: response.data.sprites.front_default,
                        nextName: response.data.name
                    })
                })
        } else if (urlNext === 1011) {
            await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlPrev)
                .then((response) => {
                    setFooterSprite({
                        prevSprite: response.data.sprites.front_default,
                        prevName: response.data.name
                    })
                })
        } else {
            axios.all(
                [await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlPrev),
                await axios.get('https://pokeapi.co/api/v2/pokemon/' + urlNext)]
            ).then((response) => {
                setFooterSprite({
                    prevSprite: response[0].data.sprites.front_default,
                    nextSprite: response[1].data.sprites.front_default,
                    prevName: response[0].data.name,
                    nextName: response[1].data.name
                });
            })
        }
    }


    useEffect(() => {
        getPokemons(contextUrl);
    }, [contextSubmit])

    useEffect(() => {
        setContextSubmit(0)
    }, [])




    if (contextSubmit === 0 || pokemonDetail === null) {
        return null;
    } else {
        return (

            <div className="main-card">
                <div className="main-card-header">
                    <h3>{zeroFormat(pokemonDetail.id)}</h3>
                    <h1>{capitalizeName(pokemonDetail.name)}</h1>
                    <h3>{checkGeneration(pokemonNumbers.current)}</h3>
                    <div>
                        <button className={`btn${pokemonDetail.types[0].type.name}`}>
                            {capitalizeName(pokemonDetail.types[0].type.name)}
                        </button>
                        {pokemonDetail.types.length === 1 ? <></> :
                            (<button className={`btn${pokemonDetail.types[1].type.name}`}>
                                {capitalizeName(pokemonDetail.types[1].type.name)}
                            </button>)}
                    </div>
                </div>
                <div className="main-card-body">

                    <div className="img-container">
                        <img
                            src={pokemonDetail.sprites.other['official-artwork'].front_default}
                            alt={pokemonDetail.name} />
                    </div>

                    <div className="stats-container">
                        <p>HP: {pokemonDetail.stats[0].base_stat}</p>
                        <div className='bar-container' role='progressbar' aria-label='HP stat'
                            aria-valuenow={pokemonDetail.stats[0].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[0].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Attack: {pokemonDetail.stats[1].base_stat}</p>
                        <div className='bar-container' role='progressbar' aria-label='Attack stat'
                            aria-valuenow={pokemonDetail.stats[1].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[1].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Defense: {pokemonDetail.stats[2].base_stat}</p>
                        <div className='bar-container' role='progressbar' aria-label='Defense stat'
                            aria-valuenow={pokemonDetail.stats[2].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[2].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Sp. Atk: {pokemonDetail.stats[3].base_stat}</p>
                        <div className='bar-container' role='progressbar' aria-label='Special attack stat'
                            aria-valuenow={pokemonDetail.stats[3].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[3].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Sp. Def: {pokemonDetail.stats[4].base_stat}</p>
                        <div className='bar-container' role='progressbar' aria-label='Special defense stat'
                            aria-valuenow={pokemonDetail.stats[4].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[4].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Speed: {pokemonDetail.stats[5].base_stat} </p>
                        <div className='bar-container' role='progressbar' aria-label='Speed stat'
                            aria-valuenow={pokemonDetail.stats[5].base_stat} aria-valuemin='0' aria-valuemax='255'>
                            <div className='bar-content' style={{ width: (pokemonDetail.stats[5].base_stat / 255) * 100 + '%' }}></div>
                        </div>
                        <p>Total: {getTotalStat()}</p>
                        <div className='bar-container' role='progressbar' aria-label='Total stats'
                            aria-valuenow={getTotalStat()} aria-valuemin='0' aria-valuemax='750'>
                            <div className='bar-content' style={{ width: (getTotalStat() / 750) * 100 + '%' }}></div>
                        </div>
                    </div>

                </div>

                <div className="main-card-footer">
                    {pokemonNumbers.current > 1 && (
                        <div className='card col-4 mx-4 bg-light '
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setContextUrl(pokemonNumbers.previous);
                                setContextSubmit(contextSubmit + 1)
                            }}>
                            <img style={{ height: 60, width: 'auto', padding: 0, margin: 0 }} src={footerSprite.prevSprite} alt={footerSprite.prevName} />
                            <h3>{zeroFormat(pokemonNumbers.previous)}</h3>
                        </div>
                    )}
                    {pokemonNumbers.current < 1010 && (
                        <div className='card col-4 mx-4 bg-light'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setContextUrl(pokemonNumbers.next);
                                setContextSubmit(contextSubmit + 1)
                            }}>
                            <img style={{ height: 60, width: 'auto', padding: 0, margin: 0 }} src={footerSprite.nextSprite} alt={footerSprite.nextName} />
                            <h3>{zeroFormat(pokemonNumbers.next)}</h3>
                        </div>
                    )}

                </div>

                {/* <Color src={pokemonDetail.sprites.other['official-artwork'].front_default} crossOrigin="anonymous" format="hex">
                    {({ data, loading }) => {
                        loading ? <></> :
                            refColor.current = data;
                        setContextBg(refColor.current)
                        console.log(refColor, contextBg, loading)

                    }}
                </Color> */}


            </div>
        )
    }



}
