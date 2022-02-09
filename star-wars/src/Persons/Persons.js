import { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";

export function Persons (props){
    const {page}=useParams()
    
        const baseURL=page==undefined?'https://swapi.dev/api/people/':`https://swapi.dev/api/people/?page=${page}`
    const [person,setPerson]=useState({results:[]})
    // const [next,setNext]=useState();
    const [next,setNext]=useState();

    


    useEffect(async ()=>{
        // const response=await fetch(baseURL+page)
        console.log(baseURL)
        const response=await fetch(baseURL)
        // console.log(baseURL+page)
        const person=await response.json()
        setNext(person.next.substring(35))
        setPerson(person)
    },[])

    return (
        <div className="container ">
            
            <h1 className="text-center mt-3">Persons</h1>
            
            <Link to={`/persons/next/${next}`}  className="btn btn-primary m-1"> next</Link>
            <div className="row">
                <ul className="list-group mb-2 col-4 ">
                    { person.results.map(p=>
                    
                            <li key={p.name} className="list-group-item m-1 btn btn-secondary ">
                                <Link  key={p.name} to={`/persons/${p.url.substring(29)}`}><h3>{p.name}</h3></Link>
                            </li>
                            )}
                </ul>
            <div className="col-8">
                <Outlet/>
            </div>
            </div>
        </div>
    )
}