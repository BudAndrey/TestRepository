import { Link, Outlet,useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { change,setButtons } from "../Data/MountData"

export function Planets(props){
    const {page}=useParams()
    const url=page==undefined?'https://swapi.dev/api/planets/':`https://swapi.dev/api/planets/?page=${page}`
    const [planets,setPlanets]=useState({results:[]})
    const [tmp,setTmp]=useState(Date.now());
    const [next,setNext]=useState(null);
    const [prev,setPrev]=useState(null); 

    useEffect( ()=>{
        fetch(url)
                .then(x=>x.json())
                    .then((p)=>{
                        setPlanets(p)
                        setButtons(p,setNext,setPrev,36)})
        
    },[tmp])

    return (
        <div  className="container">
            <h1 className="text-center mt-3">Planets</h1>
            <div className="col-3 m-1 d-flex justify-content-center">
                <Link onClick={()=>change(setTmp)}  to={`/planets/page/${prev}`}  className={prev===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>prev</Link>
                <Link onClick={()=>change(setTmp)}  to={`/planets/page/${next}`}  className={next===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>next</Link>
            </div>
            <div className="row">
                <ul className="list-group m-2 col-3">
                    { planets.results.map(p=>
                        <li key={p.name} className="list-group-item m-1 btn btn-secondary ">
                            <Link key={p.name} to={`/planets/${p.url.substring(30)}`}><h3>{p.name}</h3></Link>
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