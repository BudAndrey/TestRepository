import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export function Persons (){
    const baseURL='https://swapi.dev/api/people/'
    const [person,setPerson]=useState({results:[]})

    //const baseURL=`https://swapi.dev/api/people/?page=`
//    const  [page,setPage]=useState(1)
//    console.log(page)


    // function nextPage(){
    //     //setPage(page +1)
    //     setPage(page+1)
    //     console.log(page);
         
    // }
    useEffect(async ()=>{
        // const response=await fetch(baseURL+page)
        const response=await fetch(baseURL)
        // console.log(baseURL+page)
        const person=await response.json()
        // setPage(page+1)
        setPerson(person)
    },[])

    return (
        <div className="container ">
            
            <h1 className="text-center mt-3">Persons</h1>
            {/* <Link  to={`?page=${page}`} className="btn btn-primary m-1"> next</Link> */}
            <div className="row">
                <ul className="list-group mb-2 col-4 ">
                    { person.results.map(p=>
                    
                            <li key={p.name} className="list-group-item m-1 btn btn-secondary ">
                                <Link  key={p.name} to={`${p.url.substring(29)}`}><h3>{p.name}</h3></Link>
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