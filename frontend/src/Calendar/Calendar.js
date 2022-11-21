import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Calendar from "rc-year-calendar";
import Toolbar from '../Toolbar/Toolbar';
import ImageViewer from '../ImageViewer/ImageViewer';
import { useEffect } from 'react';
import './Calendar.css'

function CH_Calendar(props){
    const navigate = useNavigate();
    const [isViewImage, setIsViewingImage] = useState(false);
    const [dateSelected, setDateSelected] = useState(null)

    const showImage = (e) => {
        if(!isViewImage){
            setIsViewingImage(true)
            setDateSelected(e.date.toLocaleDateString().replace('/','-').replace('/','-'))
        }
    };

    return (
        <div className="Calendar">
            <div>
                <Toolbar pageSelected="Calendar"/>
            </div>
            <div>
                {!isViewImage? "": 
                <ImageViewer 
                    date={dateSelected}
                    close={() => {setIsViewingImage(false)}}

                />}
                <Calendar 
                    year={1985} 
                    enableRangeSelection={true}
                    minDate={new Date(1985,10,18)} 
                    maxDate={new Date(1995,11,31)}
                    onDayClick={showImage}
                />
            </div>

          
        </div>
    );
}

export default CH_Calendar;