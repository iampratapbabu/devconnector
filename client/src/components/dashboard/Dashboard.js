import React,{Fragment, useEffect} from 'react';
import{Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import DashboardActions from './DashboardActions';

const Dashboard = ({getCurrentProfile,auth:{user,isAuthenticated},profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    console.log(profile); //profile ko destructure krke profile and loading bahar nikal liye hain profilereducer se
    console.log(user);
    if(loading && profile === null){
        return <h1>Loading...</h1>;
    }
    
    return (
        <div>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
            <i className="fas fa-user"></i>
                Hello {user.user && user.user.name}
            </p>
            {
                profile !== null ? (
                    <Fragment>
                        <DashboardActions/>
                    </Fragment>
                ):(
                    <Fragment>
                        <p>You has not setup a profile! Please add more info</p>
                        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
                    </Fragment>
                )
            }
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.authReducer,
    profile:state.profileReducer
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
