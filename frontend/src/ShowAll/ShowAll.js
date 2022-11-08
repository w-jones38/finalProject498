import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Toolbar from "../Toolbar/Toolbar";
import "./ShowAll.css"

function ShowAll(props) {
    const isFavorites = (new URLSearchParams(window.location.search)
        .get("favorites") === "true") ? true : false;

    // TODO: need a way to set data, depends on how
    // we decide to store our images
    const [data, setData] = useState([
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png",
        // "logo2_512.png"
    ])

    console.log(data)

    return (
        <div className="showAll">
            <Toolbar pageSelected="ShowAll"/>
            <header className="showAll-header">
                <div>
                You are viewing {isFavorites ? "your favorites" : "all of your comics"}
                </div>
                <div>
                    {data.length > 1 ?
                    data.map((url) => {
                        return(<div key={`${url}${Math.random()}`}>{url}</div>)
                    }) :
                    <LoadingSpinner />
                    }
                </div>
            </header>
        </div>
    )
}

export default ShowAll
