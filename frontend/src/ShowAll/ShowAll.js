import React, { useState } from 'react';
import ClickablePicture from '../ClickablePicture/ClickablePicture';
import { allStorage, b64toBlob } from '../helper';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Toolbar from "../Toolbar/Toolbar";
import "./ShowAll.css"

function ShowAll(props) {
    const isFavorites = (new URLSearchParams(window.location.search)
        .get("favorites") === "true") ? true : false;

    // TODO: need a way to set data, depends on how
    // we decide to store our images
    const [data, setData] = useState([])

    // TODO: we should have a pop up render and show the user
    // a close up of the comic they selected
    const openPicturePreview = () => {
        console.log("AHHHH")
    };

    const fetchImages = async (imagesUrl) => {
        let res;
        try {
            res = (await fetch(imagesUrl)).json();
        } catch (error) {
            console.log(error);
            setData([]);
            return;
        }
        res.then((result) => {
            for (let i = 0; i < result.length(); ++i){
                const imageBlob = b64toBlob(result.comicStripBase64);
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setData(data.push(imageObjectURL));
            }
        })
    };

    useState(() => {
        let all = Object.keys(allStorage());
        let url = "https://localhost:7144/api/CalvinStrips/ids/ids?"
        for(let i = 0; i < all.length; ++i){
            url += `ids=${all[i]}`;
            if(i != all.length-1){
                url += `&`
            }
        }
        console.log(url)
        fetchImages(url);
    }, [])

    return (
        <div className="showAll">
            <Toolbar pageSelected="ShowAll"/>
            <header className="showAll-content">
                
                <div className='showAll-headerText'>
                You are viewing {isFavorites ? "your favorites" : "all of your comics"}
                </div>

                <div className='showAll-pictureContainer'>
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
