import React from 'react';
import './Toolbar.css'

function Toolbar(props) {
    return (
        <header className='Toolbar'>
            {/*
            TODO: We probably want to style these buttons in Toolbar.css
            OR we could create new components called ToolbarButtons? and add
            them in here and style them there
            */}
            <button disabled={props.pageSelected === "Homepage"}>HOME</button>
            <button disabled={props.pageSelected === "Profile"}>PROFILE</button> 
        </header>
    );
}

export default Toolbar;