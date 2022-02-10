import { Link,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { VehicleImg } from '../Data/PersonData'

export function Vehicle(){
    const [veh,setVeh]=useState({pilots:[],films:[]})
    const [pilots,setPilots]=useState([])
    const [films,setFilms]=useState([])
    const {id}=useParams()
    const url=`https://swapi.dev/api/vehicles/${id}`
    const [imgURL,setURL]=useState('')

    useEffect( async ()=>{
        const response=await fetch(url)
        const veh=await response.json()
        setVeh(veh)
        setURL(VehicleImg(id))
        
        if(veh.pilots.length!=0){
            const arr=[]
            for (let i = 0; i < veh.pilots.length; i++) {
                let res=await fetch(veh.pilots[i])
                let pilot=await res.json()
                arr.push(pilot)
            }
            setPilots(arr)
        }

        else 
            setPilots([])

        if(veh.films.length!=0){
            const arr=[]
            for (let i = 0; i < veh.films.length; i++) {
                let res2= await fetch(veh.films[i])
                let film=await res2.json()
                arr.push(film)
            }
            setFilms(arr)
        }

        else 
            setFilms([])

    },[id])

    return(
        <div  className='card m-4 text-center sticky-top'>
        <h2 className='card-title'>{veh.name}</h2>
        <div className='w-75 ms-auto me-auto'>
            <img className='w-100' src={imgURL} />
        </div>
        <div className="d-flex justify-content-center"> 
            <div className="m-2">
                    <div className="m-2">model: <b>{veh.model}</b></div>
                    <div className="m-2">manufacturer:<b> {veh.manufacturer}</b></div>
                    <div className="m-2">cost_in_credits: <b>{veh.cost_in_credits}</b></div>
                    <div className="m-2">length: <b>{veh.length}</b></div>
                    <div className="m-2">max_atmosphering_speed: <b>{veh.max_atmosphering_speed}</b></div>
                </div>
                <div className="m-2">
                    <div className="m-2">crew: <b>{veh.crew}</b></div>
                    <div className="m-2">consumables: <b>{veh.consumables}</b></div>
                    <div className="m-2">passengers: <b>{veh.passengers}</b></div>
                    <div className="m-2">cargo_capacity: <b>{veh.cargo_capacity}</b></div>
                    <div className="m-2">veh_class: <b>{veh.veh_class}</b></div>
                </div>
        </div>
        <ul className="list-inline">
            {veh.pilots.length!==0 ? <h4>Pilots</h4>:''}
            {pilots.map(r=>
                <Link key={r.name} to={`/persons/${r.url.substring(29)}`}>
                    <li key={r.name} className="list-inline-item m-2"> {r.name}</li>
                </Link>
            )}
             {veh.films.length!==0 ? <h4>Films</h4>:''}
            {films.map(f=>
                <Link key={f.title} to={`/films/${f.url.substring(28)}`}>
                    <li key={f.title} className="list-inline-item m-2"> {f.title}</li>
                </Link>
            )}
        </ul>
        
</div>
    )
}