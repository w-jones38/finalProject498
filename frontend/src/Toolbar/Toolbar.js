import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Toolbar.css'

function Toolbar(props) {
    const navigate = useNavigate();

    const navToHomepage = () => {
        navigate('/');
    };
    const navToProfile = () => {
        navigate('/profile');
    };
    return (
        <header className='Toolbar'>
            {/*
            TODO: We probably want to style these buttons in Toolbar.css
            OR we could create new components called ToolbarButtons? and add
            them in here and style them there
            */}

            <button disabled={props.pageSelected === "Homepage"} 
                onClick={navToHomepage}>HOME</button>
            <button disabled={props.pageSelected === "Profile"}
                onClick={navToProfile}>PROFILE</button> 
        </header>
    );
}

export default Toolbar;