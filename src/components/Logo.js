import React from 'react';
import {Link} from 'react-router-dom';

function Logo() {
    return (
        <div className="logo">
            <Link style={{textDecoration: 'none'}} to={{
                            pathname: '/Reload',
                            state: {value: null, route: ""}}} 
            replace><h1 style={{'textAlign': 'center'}}>Community</h1></Link>
        </div>
    );
}

export default Logo;