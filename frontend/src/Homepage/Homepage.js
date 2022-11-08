import React, { useEffect, useState } from 'react';
import './Homepage.css'
import Toolbar from '../Toolbar/Toolbar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Homepage() {
    const [mainImage, setMainImage] = useState(null);

    /*
    this will take the imageUrl, fetch the image and then create
    an imageObjectURL that we can hand to our <img> tag below.
    */
    const fetchImage = async (imageUrl) => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setMainImage(imageObjectURL);
      };

    useEffect(() => {
        // TOOD: create an endpoint to request an image
        //fetchImage("insertURLhere.com")
        setMainImage('logo2_512.png');
    }, [mainImage])

    return (
        <div className='Homepage'>
            <Toolbar pageSelected='Homepage'/>
            <header className='Homepage-header'>
                {
                mainImage == null ? 
                <LoadingSpinner />
                : 
                <img src={mainImage} alt="logo2_512.png" className="Homepage-image"></img>
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