import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import ClickablePicture from '../ClickablePicture/ClickablePicture';
import './Profile.css'
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const navigate = useNavigate();

    const navToFavorites = () => {
        navigate('/showAll?favorites=true');
    };

    const navToAll = () => {
        navigate('/showAll?favorites=false');
    };

    return (
        <div className='Profile'>
            <Toolbar pageSelected='Profile'/>
            <header className='Profile-header'>
                <ClickablePicture onClick={navToFavorites} src="favorites.png" 
                    text="View All Your Favorite Comics"/>
                <ClickablePicture onClick={navToAll} src="all.png"
                    text="View All Your Revealed Comics"/>
            </header>
        </div>
    );
}

export default Profile;