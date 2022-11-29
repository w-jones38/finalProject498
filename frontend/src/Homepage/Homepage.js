import React, { useEffect, useState } from 'react';
import './Homepage.css'
import Toolbar from '../Toolbar/Toolbar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { b64toBlob, favorite, unfavorite } from '../helper';
import BetterButton from '../BetterButton/BetterButton';

function Homepage() {
    const [mainImage, setMainImage] = useState(null);
    const [mainImageID, setMainImageID] = useState(-1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [printDate, setPrintDate] = useState(null);

    const fetchImage = async (imageUrl) => {
        let res;
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

            // if the item already exists, no need to set it again, just check
            // to see if it is favorited or not
            if(localStorage.getItem(result.id)){
                if(localStorage.getItem(result.id).charAt(0) === 'f'){
                    setIsFavorite(true);
                }
            }
            else { // the item doesnt exist yet, so lets add it
                localStorage.setItem(result.id, result.id)
            }
            console.log(result)
            setMainImage(imageObjectURL);
            setMainImageID(result.id);
            setPrintDate(result.dateOfPrint)
        })
    };

    useEffect(() => {
        fetchImage("https://localhost:7144/api/CalvinStrip");
    }, [])

    return (
        <div className='Homepage'>
            <Toolbar pageSelected='Homepage'/>
            <header className='Homepage-header'>
                {
                !mainImage ? 
                <LoadingSpinner />
                :
                <div>
                    <div>Print Date: {printDate}</div>
                    <img src={mainImage} alt="whoops, this isn't right" className="Homepage-image"></img>
                    <div>
                        <BetterButton text={isFavorite ? "Unfavorite" : "Favorite"}
                            onClick={() => {
                                if(!isFavorite){
                                    setIsFavorite(true);
                                    favorite(mainImageID)
                                }
                                else {
                                    setIsFavorite(false);
                                    unfavorite(mainImageID);
                                }
                            }}
                        />
                    </div>
                </div> 
                }
                <a className="Homepage-link" href="https://en.wikipedia.org/wiki/Calvin_and_Hobbes"
                    target="_blank" rel="noopener noreferrer" >
                Learn More
                </a>
            </header>
		</div>
    )
}

export default Homepage;