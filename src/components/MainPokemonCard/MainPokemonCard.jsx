import React from 'react'

export default function MainPokemonCard() {



  return (
    <div>
        <div className="card col-8 rounded mx-auto" style={{border: '10px solid black'}}>
            <div className="card-header d-inline-flex">
                <div className="col-2 text-start">#094</div>
                <div className="col-8">Gengar</div>
                <div className="col-2 text-end">Generation 1</div>
            </div>
            <div className="card-doby d-inline-flex ">
                <div className="col-3 text-center align-self-center">
                    Type: <br/> Ghost <br/> Poison <br/>
                    Weakneses: <br/> 
                </div>
                <div className="col-6">
                    <img  className='img-fluid p-4' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" alt="Gengar" />
                </div>
                <div className="col-3 text-center align-self-center pe-3">
                
                    HP: 60 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='HP stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : (60/255)*100 + '%'}}></div>
                    </div><br />
                    Attack: 65 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Attack stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
                    </div> <br />
                    Defense: 60 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Defense stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
                    </div><br />
                    Sp. Atk: 130 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Special attack stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
                    </div><br />
                    Sp. Def: 75 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Special defense stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
                    </div><br />
                    Speed: 110 <br />
                    <div style={{height : 8 + 'px'}} className='progress' role='progressbar' aria-label='Speed stat' aria-valuenow='60' aria-valuemin='0' aria-valuemax='255'>
                    <div className='progress-bar bg-dark' style={{width : 40 + '%'}}></div>
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
