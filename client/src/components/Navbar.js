import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
    const authLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
        
            <li><a onClick={logout} href="#!">Logout</a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
       <Fragment>
           <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i class="fas fa-code"></i> DevConnector</Link>
                </h1>
                {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
            </nav>
       </Fragment>
    )
}

Navbar.prototypes ={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.authReducer
});

export default connect(mapStateToProps,{logout})(Navbar);
