import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export function Persons (){
    const baseURL='https://swapi.dev/api/people/'
    const [person,setPerson]=useState({results:[]})


    useEffect(async ()=>{
        const response=await fetch(baseURL)
        const person=await response.json()
        setPerson(person)
    },[])

    return (
        <div className="container p">
            <h2 className="text-center mt-3">Persons</h2>
            <div className="row">
                <ul className="list-group mb-2 col-4">
                    { person.results.map(p=>
                    
                            <li key={p.name} className="list-group-item m-1 btn btn-secondary">
                                <Link  key={p.name} to={`${p.url.substring(29)}`}><h3>{p.name}</h3></Link>
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