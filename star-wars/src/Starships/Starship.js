import { Link,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Starship(){
    const [starship,setShip]=useState({pilots:[],films:[]})
    const [pilots,setPilots]=useState([])
    const [films,setFilms]=useState([])
    const {id}=useParams()
    const url=`https://swapi.dev/api/starships/${id}`

    useEffect( async ()=>{
        const response=await fetch(url)
        const starship=await response.json()
        setShip(starship)
        
        console.log(starship);
        if(starship.pilots.length!=0){
            const arr=[]
            for (let i = 0; i < starship.pilots.length; i++) {
                let res=await fetch(starship.pilots[i])
                let pilot=await res.json()
                arr.push(pilot)
            }
            // starship.pilots.forEach(el => {
            //    fetch(el).then(x=>x.json()).then((y)=>arr.push(y))
            // });
            setPilots(arr)
        }
        else 
        setPilots([])

        if(starship.films.length!=0){
            const arr=[]
            for (let i = 0; i < starship.films.length; i++) {
                let res2= await fetch(starship.films[i])
                let film=await res2.json()
                arr.push(film)
            }
            setFilms(arr)
        }
        
    },[id])

    return(
        <div  className='card m-4 text-center sticky-top'>
        <h2 className='card-title'>{starship.name}</h2>

        <div className="d-flex justify-content-center"> 
            <div className="m-2">
                    <div className="m-2">model: <b>{starship.model}</b></div>
                    <div className="m-2">manufacturer:<b> {starship.manufacturer}</b></div>
                    <div className="m-2">cost_in_credits: <b>{starship.cost_in_credits}</b></div>
                    <div className="m-2">length: <b>{starship.length}</b></div>
                    <div className="m-2">hyperdrive_rating: <b>{starship.hyperdrive_rating}</b></div>
                </div>
                <div className="m-2">
                    <div className="m-2">max_atmosphering_speed: <b>{starship.max_atmosphering_speed}</b></div>
                    <div className="m-2">crew: <b>{starship.crew}</b></div>
                    <div className="m-2">passengers: <b>{starship.passengers}</b></div>
                    <div className="m-2">cargo_capacity: <b>{starship.cargo_capacity}</b></div>
                    <div className="m-2">starship_class: <b>{starship.starship_class}</b></div>
                </div>
        </div>
        <ul className="list-inline">
            {starship.pilots.length!==0 ? <h4>Pilots</h4>:''}
            {pilots.map(r=>
                <Link key={r.name} to={`/persons/${r.url.substring(29)}`}>
                    <li key={r.name} className="list-inline-item m-2"> {r.name}</li>
                </Link>
            )}
             {starship.films.length!==0 ? <h4>Films</h4>:''}
            {films.map(f=>
                <Link key={f.title} to={`/films/${f.url.substring(28)}`}>
                    <li key={f.title} className="list-inline-item m-2"> {f.title}</li>
                </Link>
            )}
        </ul>
        
</div>
    )
}