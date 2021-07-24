import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alerts = ({alerts}) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert =>(
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ))

Alerts.propTypes = {
    alerts:PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    alerts:state.alertReducer
});

export default connect(mapStateToProps)(Alerts);
