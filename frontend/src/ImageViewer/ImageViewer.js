import "./ImageViewer.css"
import React from "react"
import BetterButton from "../BetterButton/BetterButton";

function ImageViewer(props) {

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
        document.documentElement.dataset.scroll = window.scrollY;
    };
    // Listen for new scroll events
    document.addEventListener('scroll', storeScroll);
    // Update scroll position for first time
    storeScroll();

    return (
        <div className="ImageViewer">
            <img src={props.src} className="Image"/>
            <div>
                <BetterButton text={"Close"} onClick={props.close}/>
                <BetterButton text={"Favorite"} disabled={true}/>
            </div>
        </div>
    )
}

export default ImageViewer