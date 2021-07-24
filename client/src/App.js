import React,{Fragment} from 'react';
import { Route,Switch } from "react-router-dom";

import './App.css';

//Redux files setup
import {Provider} from 'react-redux';
import store from './store';


//components files
import About from './components/About';

//layout files
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Alerts from './layout/Alerts';


const App = () =>{
  return (
    <Provider store={store}>
    <Fragment> 
      <Navbar/>
      
      <Route exact path='/'component={Landing}/>
      <section className="container">
      <Alerts/>
        <Switch>
          <Route exact path='/register'component={Register}/>
          <Route exact path='/login'component={Login}/>
          
        </Switch>
        </section>
      
      
    </Fragment>
    </Provider>
  );
}

export default App;
