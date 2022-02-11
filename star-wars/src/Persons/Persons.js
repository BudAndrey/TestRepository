import { useEffect, useState } from "react";
import {  Link,  Outlet, useParams } from "react-router-dom";
import { change,setButtons } from "../Data/MountData";

export function Persons (props){
    const {page}=useParams()
    const baseURL=page==undefined?'https://swapi.dev/api/people/':`https://swapi.dev/api/people/?page=${page}`
    const [person,setPerson]=useState({results:[]})
    const [next,setNext]=useState(null);
    const [prev,setPrev]=useState(null);
    const [tmp,setTmp]=useState(Date.now());

    useEffect(async ()=>{
        const response=await fetch(baseURL)
        const person=await response.json()
        setButtons(person,setNext,setPrev,35)
        setPerson(person)
    },[tmp])

    return (
        <div className="container ">
            <h1 className="text-center mt-3">Persons</h1>
            <div className="col-3 mb-1 d-flex justify-content-center">
                <Link onClick={()=>change(setTmp)}  to={`/persons/page/${prev}`}  className={prev===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>prev</Link>
                <Link onClick={()=>change(setTmp)}  to={`/persons/page/${next}`}  className={next===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>next</Link>
            </div>
            <div className="row">
                <ul className="list-group mb-2 col-3 ">
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