import React from 'react';
import { useNavigate } from 'react-router-dom';
import BetterButton from '../BetterButton/BetterButton';
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
            <BetterButton disabled={props.pageSelected === "Profile"}
                onClick={navToProfile} text="PROFILE" />
        </header>
    );
}

export default Toolbar;