import "./ImageViewer.css"
import React, { useState, useEffect } from "react"
import BetterButton from "../BetterButton/BetterButton";
import { favorite, unfavorite, b64toBlob } from "../helper";


function ImageViewer(props) {
    console.log(props.date)

    const [isFavorite, setIsFavorite] = useState(false);
    const [mainImage, setMainImage] = useState(null);

    useState(() => {
        if(!props.id) return
        if(localStorage.getItem(props.id).charAt(0) === 'f'){
            setIsFavorite(true);
        }
    }, [])

    const dateFetchImage = async (imageUrl) => {
        let res;
        console.log(imageUrl)
        try {
            res = (await fetch(imageUrl)).json();

        } catch (error) {
            console.log(error);
            setMainImage(null);
            return;
        }
        res.then((result) => {
            const imageBlob = b64toBlob(result.comicStripBase64);
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setMainImage(imageObjectURL);
        })
    };

    useEffect(() => {
        if(props.id){
            return
        }
        dateFetchImage(`https://localhost:7144/api/CalvinStrip/dates/${props.date}`);
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
            <img src={props.id?props.src:mainImage} className="Image"/>
            <div>
                <BetterButton text={"Close"} onClick={props.close}/>
                {   props.id?
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
                />:""}
            </div>
        </div>
    )
}

export default ImageViewer