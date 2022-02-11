import { useEffect, useState } from "react"
import { Link,Outlet,useParams } from "react-router-dom"
import { change,setButtons } from "../Data/MountData"

export function Vehicles(){
    const [veh,setVeh]=useState({results:[]})
    const {page}=useParams()
    const url=page==undefined?'https://swapi.dev/api/vehicles/':`https://swapi.dev/api/vehicles/?page=${page}`
    const [tmp,setTmp]=useState(Date.now());
    const [next,setNext]=useState(null);
    const [prev,setPrev]=useState(null);

    useEffect( async ()=>{
        const response=await fetch(url)
        const veh=await response.json()
        setVeh(veh)
        setButtons(veh,setNext,setPrev,37)

    },[tmp])

    return(
        <div className="container ">
            <h2 className="text-center mt-3">Vehicles</h2>
            <div className="col-3 m-1 d-flex justify-content-center">
                <Link onClick={()=>change(setTmp)}  to={`/vehicles/page/${prev}`}  className={prev===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>prev</Link>
                <Link onClick={()=>change(setTmp)}  to={`/vehicles/page/${next}`}  className={next===null?"btn btn-secondary disabled m-1 w-25":"btn btn-secondary m-1 w-25"}>next</Link>
            </div>
            <div className="row w-100">
                <ul className="list-group m-2 col-3">
                    { veh.results.map(veh=>
                            <li key={veh.name} className="list-group-item m-1 btn btn-secondary">
                                <Link key={veh.name} to={`/vehicles/${veh.url.substring(31)}`}><h3>{veh.name}</h3></Link>
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