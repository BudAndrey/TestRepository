import { useEffect, useState } from "react"
import { Link,Outlet,useParams } from "react-router-dom"
import { change,setButtons } from "../Data/MountData"

export function Starships(){
    const [starships,setShips]=useState({results:[]})
    const {page}=useParams()
    const url=page==undefined?'https://swapi.dev/api/starships/':`https://swapi.dev/api/starships/?page=${page}`
    const [tmp,setTmp]=useState(Date.now());
    const [next,setNext]=useState(null);
    const [prev,setPrev]=useState(null);
    

    useEffect( async ()=>{
        const response=await fetch(url)
        const starships=await response.json()
        setShips(starships)
        setButtons(starships,setNext,setPrev,38)
    },[tmp])

    return(
        <div className="container ">
            <h2 className="text-center mt-3">Starships</h2>
            <div className="col-3 m-1 d-flex justify-content-center">
                <Link onClick={()=>change(setTmp)}  to={`/starships/page/${prev}`}  className={prev===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>prev</Link>
                <Link onClick={()=>change(setTmp)}  to={`/starships/page/${next}`}  className={next===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>next</Link>
            </div>
            <div className="row">
                <ul className="list-group m-2 col-3">
                    { starships.results.map(ship=>
                            <li key={ship.name} className="list-group-item m-1 btn btn-secondary">
                                <Link key={ship.name} to={`/starships/${ship.url.substring(32)}`}><h3>{ship.name}</h3></Link>
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