import { Link, useLocation,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Person(props){
    const {id}=useParams();
    const url=`https://swapi.dev/api/people/${id}`
    const [person,setPerson]=useState({films:[],vehicles:[],starships:[]})
    const [planet,setPlanet]=useState({})
    const [starships,setStarships]=useState([])
    const [vehicles,setVehicles]=useState([])
    const [films,setFilms]=useState([]) 
    const [imgURL,setURL]=useState('')

    function setUrl (){
        if (id==='1'){
            setURL('https://www.space-figuren.de/images/product_images/info_images/22002_1.jpg')
        }
        if (id==='2'){
            setURL('https://www.artmajeur.com/medias/standard/c/l/clementereira/artwork/12378956_img-20190110-133709.jpg')}
        if (id==='3')
            setURL('https://media.istockphoto.com/photos/full-size-r2d2-picture-id472287728?k=20&m=472287728&s=170667a&w=0&h=aFgiTOF563xr2iN1nzMdIc-yXmHTc_v0jk1OlhIkuNk=')
        if (id==='4')
            setURL('https://cs10.pikabu.ru/post_img/big/2020/09/12/11/1599940594141150219.jpg')
        if (id==='5')
            setURL('http://images2.fanpop.com/image/photos/9300000/leia-princess-leia-organa-solo-skywalker-9301455-893-1400.jpg')
        if (id==='6')
            setURL('https://i.pinimg.com/564x/a3/70/59/a37059cb4745a51d1421abb96b50c837.jpg')
        if (id==='7')
            setURL('https://wookiee.ru/wp-content/uploads/2014/01/berulars_detail.png')
        if (id==='8')
            setURL('https://images-na.ssl-images-amazon.com/images/I/91CTs1kIfVL._AC_SX569_.jpg')
        if (id==='9')
            setURL('https://wiki.swgoh.help/images/f/fa/Unit-Character-Biggs_Darklighter.png')
        if (id==='10')
            setURL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4c9Hp8JnKZNZSFxjaTawQ6SpxQRYlOt0oaA&usqp=CAU')
        }

    useEffect(async ()=>{
        const response=await fetch(url)
        const person=await response.json()
        setPerson(person)

        const res=await fetch(person.homeworld)
        const planet=await res.json()
        setPlanet(planet)
        setUrl()
        
        console.log(imgURL);

        if(person.starships.length!=0){
            const arr=[]
            for (let i = 0; i < person.starships.length; i++) {
                let res2= await fetch(person.starships[i])
                let ship=await res2.json()
                arr.push(ship)
            }
            setStarships(arr)
        }

        else 
            setStarships([])

        if(person.vehicles.length!=0){
            const arr=[]
            for (let i = 0; i < person.vehicles.length; i++) {
                let res2= await fetch(person.vehicles[i])
                let ship=await res2.json()
                arr.push(ship)
            }
            setVehicles(arr)
        }

        else 
            setVehicles([])
            
        if(person.films.length!=0){
        const arr=[]
        for (let i = 0; i < person.films.length; i++) {
            let res2= await fetch(person.films[i])
            let film=await res2.json()
            arr.push(film)
        }
        setFilms(arr)
    }

    else 
        setFilms([])

    },[id])

    return(
        
        <div  className='card m-4 text-center sticky-top '>
                        <h2 className='card-title'>{person.name}</h2>
                        <Link to={`/planets/${person.homeworld?.substring(30)}`}>
                            <h4> {planet.name}</h4>
                        </Link>
                         {/* <div className="d-flex justify-content-between "> */}
                         <div className='row'>
                            <div className='col-4 ' >
                                <img className='w-100' src={imgURL} />
                            </div>
                        <div className="d-flex justify-content-center col-8"> 
                            <div className="m-2" style={{fontSize: 1.3 +'em'}}>
                                <div className="m-3">height: {person.height}</div>
                                <div className="m-3">mass: {person.mass}</div>
                                <div className="m-3">hair_color: {person.hair_color}</div>
                                <div className="m-3">skin_color: {person.skin_color}</div>
                            </div>
                            <div className="m-3 "style={{fontSize: 1.3 +'em'}}>
                                <div className="m-3">eye_color: {person.eye_color}</div>
                                <div className="m-3">birth_year: {person.birth_year}</div>
                                <div className="m-3">gender: {person.gender}</div>
                            </div>
                        </div>
                        </div>
                        <ul className="list-inline">
                            {starships.length!==0 ? <h5>Starships</h5>:''}
                                {starships.map((st)=>
                                    <Link key={st.name} to={`/starships/${st.url.substring(32)}`}>
                                         <li key={st.name} className="list-inline-item m-2">Starship {st.name}</li>
                                    </Link>
                                )}
                            {vehicles.length!==0 ? <h5>Vehicles</h5>:''}
                                {vehicles.map((v)=>
                                    <Link key={v.name} to={`/starships/${v.url.substring(31)}`}>
                                        <li key={v.name} className="list-inline-item m-2">Vehicle {v.name}</li>
                                    </Link>
                                )}
                            {films.length!==0 ? <h5>Films</h5>:''}
                                {films.map((f)=>
                                    <Link key={f.title} to={`/films/${f.url.substring(28)}`}>
                                        <li key={f.title} className="list-inline-item m-2">Vehicle {f.title}</li>
                                    </Link>
                                )}
                        </ul>
                        </div>

    )
}