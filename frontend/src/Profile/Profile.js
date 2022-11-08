import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import PictureLink from '../PictureLink/PictureLink';
import './Profile.css'

function Profile(props) {
    return (
        <div className='Profile'>
            <Toolbar pageSelected='Profile'/>
            <header className='Profile-header'>
                <PictureLink />
            </header>
        </div>
    );
}

export default Profile;