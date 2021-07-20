import React,{Fragment} from 'react';
import { Route,Switch } from "react-router-dom";

import './App.css';

//components files
import About from './components/About';

//layout files

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';


const App = () =>{
  return (
    <Fragment> 
      <Navbar/>
      
      <Route exact path='/'component={Landing}/>
      <section className="container">
        <Switch>
          <Route exact path='/register'component={Register}/>
          <Route exact path='/login'component={Login}/>
          
        </Switch>
        </section>
      
      
    </Fragment>
  );
}

export default App;
