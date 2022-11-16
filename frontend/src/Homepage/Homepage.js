import React, { useEffect, useState } from 'react';
import './Homepage.css'
import Toolbar from '../Toolbar/Toolbar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import b64toBlob from '../helper';

function Homepage() {
    const [mainImage, setMainImage] = useState(null);

    const fetchImage = async (imageUrl) => {
        let res;
        try {
            res = (await fetch(imageUrl)).json();

        } catch (error) {
            console.log(error)
            setMainImage(null)
            return
        }
        res.then((result) => {
            const imageBlob = b64toBlob(result.comicStripBase64);
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setMainImage(imageObjectURL);
        })
    };

    useEffect(() => {
        fetchImage("https://localhost:7144/api/CalvinStrip")
    }, [])

    return (
        <div className='Homepage'>
            <Toolbar pageSelected='Homepage'/>
            <header className='Homepage-header'>
                {
                !mainImage ? 
                <LoadingSpinner />
                : 
                <img src={mainImage} alt="whoops, this isn't right" className="Homepage-image"></img>
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