import { useEffect, useState } from "react";
import { useParams,Link,Outlet } from "react-router-dom";

export function Films(){
    const baseURL='https://swapi.dev/api/films/'
    const [films,setFilms]=useState({results:[]})

    useEffect(async ()=>{
        const response=await fetch(baseURL)
        const films=await response.json()
        setFilms(films)
        console.log(films)
    },[])

    return (
        <div className="container">
            <h2 className="text-center mt-3">Films</h2>
            <div className="row">
                <ul className="list-group m-2 col-4">
                    { films.results.map((f)=>
                    
                            <li key={f.episode_id} className="list-group-item m-1 btn btn-secondary">
                                <Link key={f.episode_id} to={`${f.url.substring(28)}`}><h3>{f.title}</h3></Link>
                            </li>
                            )}
                </ul>
            <div className="col">
                <Outlet/>
            </div>
            </div>
        </div>

    //     <div className="d-flex flex-wrap justify-content-around">
                
    //         {films.results.map(f=>
    //             <div key={f.episode_id} className="card m-3 w-25 p-3">
    //                 <Link to='one' state={f.url}>
    //                     <h3>{f.title}</h3>
    //                 </Link>
    //                 <h4>director: {f.director}</h4>
    //                 <span>release_date: {f.release_date}</span><br/>
    //                 <p>{f.opening_crawl}</p>
    //             </div>
    //         )}
    //     </div>
     );
}