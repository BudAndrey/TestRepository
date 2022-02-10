import { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";

export function Persons (props){
    const {page}=useParams()
    const baseURL=page==undefined?'https://swapi.dev/api/people/':`https://swapi.dev/api/people/?page=${page}`
    const [person,setPerson]=useState({results:[]})
    const [next,setNext]=useState(null);
    const [prev,setPrev]=useState(null);
    const [tmp,setTmp]=useState(Date.now());
    
    function change (){
        setTmp(Date.now())
    }

    function setButtons (json){
        const checkPrev=json.previous===null?null:json.previous.substring(35)
        const checkNext=json.next===null?null:json.next.substring(35)
        setNext(checkNext)
        setPrev(checkPrev)
    }

    useEffect(async ()=>{
        const response=await fetch(baseURL)
        const person=await response.json()
        setButtons(person)
        setPerson(person)
    },[tmp])

    return (
        <div className="container ">
            
            <h1 className="text-center mt-3">Persons</h1>
            <div className="col-4 m-1 d-flex justify-content-around">
                <Link onClick={change}  to={`/persons/next/${prev}`}  className={prev===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>prev</Link>
                <Link onClick={change}  to={`/persons/next/${next}`}  className={next===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>next</Link>
            </div>
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