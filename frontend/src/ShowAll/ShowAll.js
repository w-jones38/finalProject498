import React, { useState } from 'react';
import { renderMatches } from 'react-router-dom';
import ClickablePicture from '../ClickablePicture/ClickablePicture';
import { allStorage, b64toBlob } from '../helper';
import ImageViewer from '../ImageViewer/ImageViewer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Toolbar from "../Toolbar/Toolbar";
import "./ShowAll.css"

function ShowAll() {
    const isFavorites = (new URLSearchParams(window.location.search)
        .get("favorites") === "true") ? true : false;

    const [data, setData] = useState([])
    const [isStillDownloading, setIsStillDownloading] = useState(true)
    const [currentImageViewURL, setCurrentImageViewURL] = useState(null)

    // TODO: we should have a pop up render and show the user
    // a close up of the comic they selected
    const openPicturePreview = (url) => {
        if(!currentImageViewURL){
            setCurrentImageViewURL(url)
        }
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
            const newData = data;
            for (let i = 0; i < result.length; ++i){
                const imageBlob = b64toBlob(result[i].comicStripBase64);
                const imageObjectURL = URL.createObjectURL(imageBlob);
                newData.push(imageObjectURL);
            }
            setData(newData)
            setIsStillDownloading(false)
        })
    };

    useState(() => {
        let all = Object.keys(allStorage());
        let url = "https://localhost:7144/api/CalvinStrip/ids?"
        for(let i = 0; i < all.length; ++i){
            url += `ids=${all[i]}`;
            if(i != all.length-1){
                url += `&`
            }
        }
        fetchImages(url);
    }, [])

    useState(() => {
        setIsStillDownloading(true)
    }, [data])

    return (
        <div className="showAll">
            <Toolbar pageSelected="ShowAll"/>
            <header className="showAll-content">

                {currentImageViewURL && 
                <ImageViewer 
                    src={currentImageViewURL}
                    close={() => {setCurrentImageViewURL(null)}} />
                }
                
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
                                src={url}
                                onClick={() => {
                                    openPicturePreview(url);
                                }}
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
