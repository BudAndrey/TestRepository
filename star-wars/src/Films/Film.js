import { Link, useLocation,useParams } from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Film(props){
    // const location = useLocation()
    // const url=location.state
    const {id}=useParams();
    const url=`https://swapi.dev/api/films/${id}`
    const [film,setFilms]=useState({characters:[],planets:[],starships:[],vehicles:[]})
    const [persons,setPersons]=useState([])
    const [planets,setPlanets]=useState([])
    const [starships,setStarships]=useState([])
    const [vehicles,setVehicles]=useState([])

    useEffect(async ()=>{
        const response=await fetch(url)
        const film=await response.json()
        setFilms(film)

        if(film.characters.length!=0){
            const arr=[]
            for (let i = 0; i < film.characters.length; i++) {
                let res=await fetch(film.characters[i])
                let pilot=await res.json()
                arr.push(pilot)
            }
            setPersons(arr)
        }

        else 
            setPersons([])

        if(film.planets.length!=0){
            const arr=[]
            for (let i = 0; i < film.planets.length; i++) {
                let res2= await fetch(film.planets[i])
                let planet=await res2.json()
                arr.push(planet)
            }
            setPlanets(arr)
        }

        else 
            setPlanets([])

            if(film.starships.length!=0){
                const arr=[]
                for (let i = 0; i < film.starships.length; i++) {
                    let res2= await fetch(film.starships[i])
                    let ship=await res2.json()
                    arr.push(ship)
                }
                setStarships(arr)
            }
    
            else 
                setStarships([])

                if(film.vehicles.length!=0){
                    const arr=[]
                    for (let i = 0; i < film.vehicles.length; i++) {
                        let res2= await fetch(film.vehicles[i])
                        let ship=await res2.json()
                        arr.push(ship)
                    }
                    setVehicles(arr)
                }
        
                else 
                    setVehicles([])
    },[id])

    return(
        <div className='card m-2 text-center sticky-top'>
            <div className="p-2">
                <h2 className='card-title'>{film.title}</h2>
                <h4>director: {film.director}</h4>
                <h5>release_date: {film.release_date}</h5>
                <p>{film.opening_crawl}</p>
            </div>
            <h5>Characters</h5>
                <ul className="list-inline">
                {persons.map((ch)=>
                    <Link key={ch.name} to={`/persons/${ch.url.substring(29)}`} >
                        <li key={ch.name} className="list-inline-item m-2">{ch.name}</li>
                     </Link>
                )}
                <h5>Planets</h5>
                {planets.map((p)=>
                    <Link key={p.name} to={`/planets/${p.url.substring(30)}`}>
                        <li key={p.name} className="list-inline-item m-2">{p.name}</li>
                    </Link>
                )}
            <h5>Starships</h5>
            {starships.map((st)=>
                <Link key={st.name} to={`/starships/${st.url.substring(32)}`}>
                    <li key={st.name} className="list-inline-item m-2">Starship {st.name}</li>
                </Link>
            )}
                <h5>Vehicles</h5>
            {vehicles.map((v)=>
                <Link key={v.name} to={`/starships/${v.url.substring(31)}`}>
                    <li key={v.name} className="list-inline-item m-2">Vehicle {v.name}</li>
                </Link>
            )}
                
            </ul>
        </div>
    )
}