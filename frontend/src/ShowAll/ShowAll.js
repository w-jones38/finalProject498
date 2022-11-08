import React, { useState } from 'react';
import ClickablePicture from '../ClickablePicture/ClickablePicture';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Toolbar from "../Toolbar/Toolbar";
import "./ShowAll.css"

function ShowAll(props) {
    const isFavorites = (new URLSearchParams(window.location.search)
        .get("favorites") === "true") ? true : false;

    // TODO: need a way to set data, depends on how
    // we decide to store our images
    const [data, setData] = useState([
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png",
        "logo2_512.png"
    ])

    console.log(data);

    // TODO: we should have a pop up render and show the user
    // a close up of the comic they selected
    const openPicturePreview = () => {
        console.log("AHHHH")
    };

    return (
        <div className="showAll">
            <Toolbar pageSelected="ShowAll"/>
            <header className="showAll-header">
                <div>
                You are viewing {isFavorites ? "your favorites" : "all of your comics"}
                </div>
                <div>
                    {data.length ?
                    data.map((url) => {
                        return(
                            // TODO: add some text, likely from the url, about
                            // this image that will go in the caption
                            // a date maybe?
                            <ClickablePicture key={`${url}${Math.random()}`} 
                                src={url} onClick={openPicturePreview}
                                text=""
                            />
                        )
                    }) :
                    <LoadingSpinner />
                    }
                </div>
            </header>
        </div>
    )
}

export default ShowAll
