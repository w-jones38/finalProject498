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

    // TODO REMOVE TESTING
    const addToStore = () => {
        let rand = (Math.floor(Math.random() * 400)+1).toString();
        localStorage.setItem(rand,rand);
        console.log(allStorage())
    }
    // END TESTING

    return (
        <header className='Toolbar'>
            <BetterButton disabled={props.pageSelected === "Homepage"}
                onClick={navToHomepage} text="HOME"/>
            <img className="Toolbar-image" src="header.png" />
            {/*TODO REMOVE TESTING*/}
            <button onClick={() => {
                console.log(allStorage());
            }}>SHOW LOCAL STORAGE</button>
            <button onClick={() => {
                localStorage.clear();
                console.log(allStorage())
            }}>CLEAR LOCAL STORAGE</button>
            <button onClick={addToStore}>ADD RANDOM TO LOCAL STORAGE</button>
            {/*END TESTING*/}
            <BetterButton disabled={props.pageSelected === "Profile"}
                onClick={navToProfile} text="PROFILE" />
        </header>
    );
}

export default Toolbar;
