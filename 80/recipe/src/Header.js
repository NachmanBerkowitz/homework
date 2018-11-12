import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <NavLink exact to="/recipe-book">Home </NavLink>
            <hr />
        </>
    );
}

export default Header;