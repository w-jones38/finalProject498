import "./ImageViewer.css"
import React, { useState } from "react"
import BetterButton from "../BetterButton/BetterButton";
import { favorite, unfavorite } from "../helper";

function ImageViewer(props) {

    const [isFavorite, setIsFavorite] = useState(false);

    useState(() => {
        if(localStorage.getItem(props.id).charAt(0) === 'f'){
            setIsFavorite(true);
        }
    }, [])

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
                <BetterButton text={isFavorite ? "Unfavorite" : "Favorite"}
                    onClick={() => {
                        if(!isFavorite){
                            setIsFavorite(true);
                            favorite(props.id)
                        }
                        else {
                            setIsFavorite(false);
                            unfavorite(props.id);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ImageViewer