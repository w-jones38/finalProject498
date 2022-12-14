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
    const [currentImageViewID, setCurrentImageViewID] = useState(null)
    const [isSunday, setIsSunday] = useState(null)
    const [isSundayArray, setIsSundayArray] = useState([])
    const [allIDs, setAllIDs] = useState([])
    const [allPrintDates, setAllPrintDates] = useState([])
    const [currentImagePrintDate, setCurrentImagePrintDate] = useState(null)

    const openPicturePreview = (url, id, isSunday, printDate) => {
        if(!currentImageViewURL){
            setCurrentImageViewURL(url)
            setCurrentImageViewID(id)
            setIsSunday(isSunday)
            setCurrentImagePrintDate(printDate)
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
            const tempAllIDs = allIDs
            const tempIsSundayArray = isSundayArray
            const tempPrintDates = allPrintDates;
            for (let i = 0; i < result.length; ++i){
                const imageBlob = b64toBlob(result[i].comicStripBase64);
                const imageObjectURL = URL.createObjectURL(imageBlob);
                newData.push(imageObjectURL);
                tempAllIDs.push(result[i].id);
                tempIsSundayArray.push(result[i].sundayComic)
                tempPrintDates.push(result[i].dateOfPrint)
            }
            setData(newData)
            setAllIDs(tempAllIDs)
            setIsSundayArray(tempIsSundayArray)
            setAllPrintDates(tempPrintDates)
            setIsStillDownloading(false)
        })
    };

    useState(() => {
        let all = Object.keys(allStorage());

        // if we are only looking at favorites, we need to check local storage
        // again to see the values. If they have an f as the fist character,
        // it is a favorite
        if(isFavorites){
            let temp = [];
            for(let i = 0; i < all.length; ++i){
                if(localStorage.getItem(all[i]).charAt(0) === 'f'){
                    temp.push(all[i]);
                }
            }
            all = temp;
        }

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
                    id={currentImageViewID}
                    isSunday={isSunday}
                    date={currentImagePrintDate}
                    close={() => {setCurrentImageViewURL(null)}} />
                }
                
                <div className='showAll-headerText'>
                You are viewing {isFavorites ? "your favorites" : "all of your comics"}
                </div>

                <div className='showAll-pictureContainer'>
                    {!data.length && !isStillDownloading && "sorry... nothing found"}
                    {data.length ?
                    data.map((url, index) => {
                        return(
                            // TODO: add some text, likely from the url, about
                            // this image that will go in the caption
                            // a date maybe?
                            <ClickablePicture key={`${url}${Math.random()}`}
                                shouldOpaque={currentImageViewURL != null}
                                src={url}
                                onClick={() => {
                                    openPicturePreview(url, allIDs[index], isSundayArray[index], allPrintDates[index]);
                                }}
                                text={allPrintDates[index]}
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
