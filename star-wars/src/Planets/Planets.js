import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

export function Planets(props){
    const url='https://swapi.dev/api/planets/'
    const [planets,setPlanets]=useState({results:[]}) 

    useEffect( ()=>{
        fetch(url)
                .then(x=>x.json())
                    .then((p)=>setPlanets(p))
    
        // const response= await fetch(url)
        // const p= await response.json()
        
        // console.log(p);
        // setPlanets(p);
    },[])

    return (
        <div className="container">
            <h1 className="text-center mt-3">Planets</h1>
        <div className="row">
            <ul className="list-group m-2 col-4">
                { planets.results.map(p=>
                        <li key={p.name} className="list-group-item m-1 btn btn-secondary">
                            <Link key={p.name} to={`${p.url.substring(30)}`}><h3>{p.name}</h3></Link>
                        </li>
                        )}
            </ul>
        <div className="col">
            <Outlet/>
        </div>
        </div>
    </div>
    )
}