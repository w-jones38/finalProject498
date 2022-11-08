import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import './Profile.css'

function Profile(props) {
    return (
        <div className='Profile'>
            <Toolbar pageSelected='Profile'/>
            <header className='Profile-header'>
                Stinky
            </header>
        </div>
    );
}

export default Profile;