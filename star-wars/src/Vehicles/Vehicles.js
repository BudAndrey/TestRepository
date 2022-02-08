import { useEffect, useState } from "react"
import { Link,Outlet } from "react-router-dom"

export function Vehicles(){

    const [veh,setVeh]=useState({results:[]})
    const url='https://swapi.dev/api/vehicles/'

    useEffect( async ()=>{
        const response=await fetch(url)
        const veh=await response.json()
        setVeh(veh)

    },[])

    return(
        <div className="container ">
            <h2 className="text-center mt-3">Vehicles</h2>
        <div className="row w-100">
            <ul className="list-group m-2 col-4">
                { veh.results.map(veh=>
                        <li key={veh.name} className="list-group-item m-1 btn btn-secondary">
                            <Link key={veh.name} to={`${veh.url.substring(31)}`}><h3>{veh.name}</h3></Link>
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