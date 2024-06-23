import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/form">Form</Link>
    </nav>
);

export default Navbar;