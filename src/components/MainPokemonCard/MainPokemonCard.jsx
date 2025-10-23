import { useContext, useEffect, useState, useRef } from "react";
import { bgContext, submitContext, urlContext } from "../../App";
import { FastAverageColor } from "fast-average-color";
import {
  checkGeneration,
  capitalizeName,
  getTotalStat,
  zeroFormat,
} from "../../helpers/helpers";
import apiCall from "../../helpers/apiCall";

import SmallPokemonCard from "../SmallPokemonCard/SmallPokemonCard";

export default function MainPokemonCard() {
  const [contextUrl, setContextUrl] = useContext(urlContext);

  const [contextSubmit, setContextSubmit] = useContext(submitContext);

  const [contextBg, setContextBg] = useContext(bgContext);

  const [pokemonDetail, setPokemonDetail] = useState(null);

  const [pokemonNumbers, setPokemonNumbers] = useState({
    current: "",
    previous: "",
    next: "",
  });

  const [footerSprite, setFooterSprite] = useState({
    prevSprite: "",
    nextSprite: "",
    prevName: "",
    nextName: "",
  });

  let refColor = useRef(null);

  const fac = new FastAverageColor();

  const getPokemon = (url) => {
    if (contextSubmit === 0) {
    } else if (contextUrl === "" && contextSubmit !== 0) {
    } else {
      apiCall("pokemon/" + url)
        .then((data) => {
          // console.log(data);
          setPokemonDetail(data);
          setPokemonNumbers({
            current: data.id,
            previous: data.id - 1,
            next: data.id + 1,
          });
          getSpritesFooter(data.id - 1, data.id + 1);
          setBackgroundColor(
            data.sprites.other["official-artwork"].front_default
          );
        })
        .catch((error) => {
          alert("El nombre o numero Pokemon no existe.");
          console.log(error);
        });
    }
  };

  const setBackgroundColor = (sprite) => {
    fac
      .getColorAsync(sprite)
      .then((res) => {
        // console.log(res)
        refColor.current = res.hex;
        setContextBg(refColor.current);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSpritesFooter = (urlPrev, urlNext) => {
    // console.log(urlPrev)
    // console.log(urlNext)

    if (urlPrev === 0) {
      apiCall("pokemon/" + urlNext).then((res) => {
        setFooterSprite({
          nextSprite: res.sprites.front_default,
          nextName: res.name,
        });
      });
    } else if (urlNext === 1011) {
      apiCall("pokemon/" + urlPrev).then((res) => {
        setFooterSprite({
          prevSprite: res.sprites.front_default,
          prevName: res.name,
        });
      });
    } else {
      Promise.all([
        apiCall("pokemon/" + urlPrev),
        apiCall("pokemon/" + urlNext),
      ]).then(([pokemonPrev, pokemonNext]) => {
        // console.log(pokemonNext, pokemonPrev);
        setFooterSprite({
          prevSprite: pokemonPrev.sprites.front_default,
          nextSprite: pokemonNext.sprites.front_default,
          prevName: pokemonPrev.name,
          nextName: pokemonNext.name,
        });
      });
    }
  };

  useEffect(() => {
    getPokemon(contextUrl);
  }, [contextSubmit]);

  useEffect(() => {
    setContextSubmit(0);
  }, []);

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
            {pokemonDetail.types.length === 1 ? (
              <></>
            ) : (
              <button className={`btn${pokemonDetail.types[1].type.name}`}>
                {capitalizeName(pokemonDetail.types[1].type.name)}
              </button>
            )}
          </div>
        </div>
        <div className="main-card-body">
          <div className="img-container">
            <img
              src={
                pokemonDetail.sprites.other["official-artwork"].front_default
              }
              alt={pokemonDetail.name}
            />
          </div>

          <div className="stats-container">
            <p>HP: {pokemonDetail.stats[0].base_stat}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="HP stat"
              aria-valuenow={pokemonDetail.stats[0].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[0].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Attack: {pokemonDetail.stats[1].base_stat}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Attack stat"
              aria-valuenow={pokemonDetail.stats[1].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[1].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Defense: {pokemonDetail.stats[2].base_stat}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Defense stat"
              aria-valuenow={pokemonDetail.stats[2].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[2].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Sp. Atk: {pokemonDetail.stats[3].base_stat}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Special attack stat"
              aria-valuenow={pokemonDetail.stats[3].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[3].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Sp. Def: {pokemonDetail.stats[4].base_stat}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Special defense stat"
              aria-valuenow={pokemonDetail.stats[4].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[4].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Speed: {pokemonDetail.stats[5].base_stat} </p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Speed stat"
              aria-valuenow={pokemonDetail.stats[5].base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            >
              <div
                className="bar-content"
                style={{
                  width: (pokemonDetail.stats[5].base_stat / 255) * 100 + "%",
                }}
              ></div>
            </div>
            <p>Total: {getTotalStat(pokemonDetail)}</p>
            <div
              className="bar-container"
              role="progressbar"
              aria-label="Total stats"
              aria-valuenow={getTotalStat(pokemonDetail)}
              aria-valuemin="0"
              aria-valuemax="750"
            >
              <div
                className="bar-content"
                style={{
                  width: (getTotalStat(pokemonDetail) / 750) * 100 + "%",
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* /////////////////////////////////////// Footer ////////////////////////// */}
        <div className="main-card-footer">
          {pokemonNumbers.current > 1 && (
            <div
              className="card col-4 mx-4 bg-light "
              style={{ cursor: "pointer" }}
              onClick={() => {
                setContextUrl(pokemonNumbers.previous);
                setContextSubmit(contextSubmit + 1);
              }}
            >
              <img
                style={{ height: 96, padding: 0, margin: 0 }}
                src={footerSprite.prevSprite}
                alt={footerSprite.prevName}
              />
              <h3>{zeroFormat(pokemonNumbers.previous)}</h3>
            </div>
          )}
          {pokemonNumbers.current < 1010 && (
            <div
              className="card col-4 mx-4 bg-light"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setContextUrl(pokemonNumbers.next);
                setContextSubmit(contextSubmit + 1);
              }}
            >
              <img
                style={{ height: 96, padding: 0, margin: 0 }}
                src={footerSprite.nextSprite}
                alt={footerSprite.nextName}
              />
              <h3>{zeroFormat(pokemonNumbers.next)}</h3>
            </div>
          )}
        </div>

        <SmallPokemonCard pokeName={pokemonDetail.name}></SmallPokemonCard>
      </div>
    );
  }
}
