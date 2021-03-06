import React,{Fragment,useEffect} from 'react';
import { Route,Switch } from "react-router-dom";
import './App.css';

//Redux files setup
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

//layout files
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Alerts from './layout/Alerts';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';



if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{

  //user loading
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  //authAction se function run krne ke liye dispatch use krke direct fuction run kr skte hain

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
          <PrivateRoute exact path='/dashboard'component={Dashboard}/>
          <PrivateRoute exact path='/create-profile'component={CreateProfile}/>
          <PrivateRoute exact path='/eit-profile'component={EditProfile}/>
          <PrivateRoute exact path='/add-experience'component={AddExperience}/>
          <PrivateRoute exact path='/add-education'component={AddEducation}/>
          
        </Switch>
        </section>
      
      
    </Fragment>
    </Provider>
  );
}

export default App;
