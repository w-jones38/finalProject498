import React, { useEffect, useState } from 'react';
import './Homepage.css'

function Homepage() {
    const imageUrl = "";
    const [mainImage, setMainImage] = useState(null);

    /*
    this will take the imageUrl, fetch the image and then create
    an imageObjectURL that we can hand to our <img> tag below.
    */
    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setMainImage(imageObjectURL);
      };

    useEffect(() => {
        // TOOD: create an endpoint to request an image
        //fetchImage()
        setMainImage('logo2_512.png');
    }, [mainImage])

    return (
        <div className='Homepage'>
            <header className='Homepage-header'>
                {
                // TODO: may want to change the "loading" to be a component
                mainImage == null ? "loading" : 
                <img src={mainImage} className="Homepage-image"></img>
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