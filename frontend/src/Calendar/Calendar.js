import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Calendar from "rc-year-calendar";
import Toolbar from '../Toolbar/Toolbar';
import ImageViewer from '../ImageViewer/ImageViewer';
import { useEffect } from 'react';
import './Calendar.css'

//mindate={new Date(1985,11,18)} maxdate={new Date(1995,12,31)}
//this.props.history.push('/path')
//e => console.log(e.date.toLocaleDateString())

// const ProtectedComponent = () => {
//       return <Navigate to="/" />
//     }

function CH_Calendar(props){
    const navigate = useNavigate();
    const [isViewImage, setIsViewingImage] = useState(false);
    const [dateSelected, setDateSelected] = useState(null)

    const navToHomepage = (e) => {
        //navigate('/');
        setIsViewingImage(true)
        setDateSelected(e.date.toLocaleDateString().replace('/','-').replace('/','-'))
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
                {console.log(isViewImage)}
                <Calendar 
                    year={1985} 
                    enableRangeSelection={true}
                    minDate={new Date(1985,10,18)} 
                    maxDate={new Date(1995,11,31)}
                    onDayClick={navToHomepage}
                />
            </div>

          
        </div>
    );
}

export default CH_Calendar;