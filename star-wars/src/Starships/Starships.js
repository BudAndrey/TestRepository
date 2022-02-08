import { useEffect, useState } from "react"
import { Link,Outlet } from "react-router-dom"

export function Starships(){
    const [starships,setShips]=useState({results:[]})
    const url='https://swapi.dev/api/starships/'

    useEffect( async ()=>{
        const response=await fetch(url)
        const starships=await response.json()
        setShips(starships)

    },[])

    return(
        <div className="container ">
            <h2 className="text-center mt-3">Starships</h2>
        <div className="row">
            <ul className="list-group m-2 col-4">
                { starships.results.map(ship=>
                        <li key={ship.name} className="list-group-item m-1 btn btn-secondary">
                            <Link key={ship.name} to={`${ship.url.substring(32)}`}><h3>{ship.name}</h3></Link>
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