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

    // TODO REMOVE TESTING
    const addToStore = () => {
        let rand = (Math.floor(Math.random() * 400)+1).toString();
        localStorage.setItem(rand,rand);
        console.log(allStorage())
    }
    // END TESTING

    return (
        <header className='Toolbar'>
            <table>
                <tr>
                    <td>
                        <BetterButton disabled={props.pageSelected === "Homepage"}
                            onClick={navToHomepage} text="HOME"/>
                    </td>
                    <td>
                        <div class="Toolbar-image-style">
                            <img className="Toolbar-image" src="header.png" />
                        </div>
                    </td>
                </tr>
            </table>
            
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
            <BetterButton disabled={props.pageSelected === "Calendar"}
                onClick={navToCalendar} text="CALENDAR" />
        </header>
    );
}

export default Toolbar;
