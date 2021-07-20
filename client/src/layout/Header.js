import React from 'react'
import{Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <p>This is header file</p>
            <Link to='/about'>About</Link>
            <hr/>
        </div>
    )
}

export default Header
