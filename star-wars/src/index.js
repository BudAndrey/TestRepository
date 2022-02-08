import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Films } from './Films/Films'
import { Film } from './Films/Film';
import { NotFound } from './NotFound';
import { Persons } from './Persons/Persons';
import { Planets } from './Planets/Planets';
import { Person } from './Persons/Person';
import {Link,Route, BrowserRouter as Router, Routes, Outlet} from 'react-router-dom'
import { Planet } from './Planets/Planet';
import {Starships} from './Starships/Starships'
import {Starship} from './Starships/Starship'
import { Vehicle } from './Vehicles/Vehicle';
import { Vehicles } from './Vehicles/Vehicles';


const routing =(
  <Router>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid justify-content-around">
        <Link to="/Persons" className="btn btn-outline-primary me-2" >Persons</Link>
        <Link to="/films" className="btn btn-outline-primary me-2" >Films</Link>
        <Link to="/Planets" className="btn btn-outline-primary me-2" >Planets</Link>
        <Link to="/Starships" className="btn btn-outline-primary me-2" >Starships</Link>
        <Link to="/Vehicles" className="btn btn-outline-primary me-2" >Vehicles</Link>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/films" element={<Films/>}>
          <Route path=":id" element={<Film/>}/>
      </Route>
      <Route path="/persons" element={<Persons/>}>
          <Route path=":id" element={<Person/>}/>
      </Route>
      <Route path="/planets" element={<Planets/>}>
          <Route path=":id" element={<Planet/>}/>
      </Route>
      <Route path="/starships" element={<Starships/>}>
          <Route path=":id" element={<Starship/>}/>
      </Route>
      <Route path="/vehicles" element={<Vehicles/>}>
          <Route path=":id" element={<Vehicle/>}/>
      </Route>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </Router>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);

