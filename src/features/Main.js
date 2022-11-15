import React from "react";
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h5>Hello, world.</h5>
            <Link to="/contacts">Let's start!!</Link>
        </div>
    );
}

export default Main;