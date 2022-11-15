import React from 'react';
import BetterButton from '../BetterButton/BetterButton';
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
            <BetterButton disabled={props.pageSelected === "Homepage"}
                onClick={navToHomepage} text="HOME"/>
            <img className="Toolbar-image" src="header.png" />
            <BetterButton disabled={props.pageSelected === "Profile"}
                onClick={navToProfile} text="PROFILE" />
        </header>
    );
}

export default Toolbar;
