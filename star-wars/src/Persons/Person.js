import { Link, useLocation,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Person(props){
    const {id}=useParams();
    const url=`https://swapi.dev/api/people/${id}`
    const [person,setPerson]=useState({films:[],vehicles:[],starships:[]})
    const [planet,setPlanet]=useState({})
    const [starships,setStarships]=useState([])
    const [vehicles,setVehicles]=useState([])
    const [films,setFilms]=useState([])

    useEffect(async ()=>{
        const response=await fetch(url)
        const person=await response.json()
        setPerson(person)

        const res=await fetch(person.homeworld)
        const planet=await res.json()
        setPlanet(planet)

        if(person.starships.length!=0){
            const arr=[]
            for (let i = 0; i < person.starships.length; i++) {
                let res2= await fetch(person.starships[i])
                let ship=await res2.json()
                arr.push(ship)
            }
            setStarships(arr)
        }

        else 
            setStarships([])

        if(person.vehicles.length!=0){
            const arr=[]
            for (let i = 0; i < person.vehicles.length; i++) {
                let res2= await fetch(person.vehicles[i])
                let ship=await res2.json()
                arr.push(ship)
            }
            setVehicles(arr)
        }

        else 
            setVehicles([])
            
        if(person.films.length!=0){
        const arr=[]
        for (let i = 0; i < person.films.length; i++) {
            let res2= await fetch(person.films[i])
            let film=await res2.json()
            arr.push(film)
        }
        setFilms(arr)
    }

    else 
        setFilms([])

    },[id])

    return(
        
        <div  className='card m-4 text-center sticky-top '>
                        <h2 className='card-title'>{person.name}</h2>
                        <Link to={`/planets/${person.homeworld?.substring(30)}`}>
                            <h4> {planet.name}</h4>
                        </Link>
                         {/* <div className="d-flex justify-content-between "> */}
                         <div className='row'>
                            <div className='col-4 ' >
                                <img className='w-100' src='https://www.space-figuren.de/images/product_images/info_images/22002_1.jpg' />
                            </div>
                        <div className="d-flex justify-content-center col-8"> 
                            <div className="m-2" style={{fontSize: 1.3 +'em'}}>
                                <div className="m-3">height: {person.height}</div>
                                <div className="m-3">mass: {person.mass}</div>
                                <div className="m-3">hair_color: {person.hair_color}</div>
                                <div className="m-3">skin_color: {person.skin_color}</div>
                            </div>
                            <div className="m-3 "style={{fontSize: 1.3 +'em'}}>
                                <div className="m-3">eye_color: {person.eye_color}</div>
                                <div className="m-3">birth_year: {person.birth_year}</div>
                                <div className="m-3">gender: {person.gender}</div>
                            </div>
                        </div>
                        </div>
                        <ul className="list-inline">
                            {starships.length!==0 ? <h5>Starships</h5>:''}
                                {starships.map((st)=>
                                    <Link key={st.name} to={`/starships/${st.url.substring(32)}`}>
                                         <li key={st.name} className="list-inline-item m-2">Starship {st.name}</li>
                                    </Link>
                                )}
                            {vehicles.length!==0 ? <h5>Vehicles</h5>:''}
                                {vehicles.map((v)=>
                                    <Link key={v.name} to={`/starships/${v.url.substring(31)}`}>
                                        <li key={v.name} className="list-inline-item m-2">Vehicle {v.name}</li>
                                    </Link>
                                )}
                            {films.length!==0 ? <h5>Films</h5>:''}
                                {films.map((f)=>
                                    <Link key={f.title} to={`/films/${f.url.substring(28)}`}>
                                        <li key={f.title} className="list-inline-item m-2">Vehicle {f.title}</li>
                                    </Link>
                                )}
                        </ul>
                        </div>

    )
}