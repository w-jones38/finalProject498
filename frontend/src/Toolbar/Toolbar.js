import React from 'react';
import BetterButton from '../BetterButton/BetterButton';
import { useNavigate } from 'react-router-dom';
import './Toolbar.css'
import { allStorage } from '../helper';

function Toolbar(props) {
    const navigate = useNavigate();

    const navToHomepage = () => {
        navigate('/');
    };

    const navToProfile = () => {
        navigate('/profile');
    };

    const navToCalendar = () => {
        navigate('/calendar');
    };

    return (
        <header className='Toolbar'>
            <BetterButton disabled={props.pageSelected === "Homepage"}
                onClick={navToHomepage} text="HOME"/>
            {/* <img className="Toolbar-image" src="header.png" /> */}
            <BetterButton disabled={props.pageSelected === "Profile"}
                onClick={navToProfile} text="PROFILE" />
            <BetterButton disabled={props.pageSelected === "Calendar"}
                onClick={navToCalendar} text="CALENDAR" />
        </header>
    );
}

export default Toolbar;
