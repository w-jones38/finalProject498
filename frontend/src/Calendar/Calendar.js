import React from 'react'
import { useNavigate } from 'react-router-dom';
import Calendar from "rc-year-calendar";
import Toolbar from '../Toolbar/Toolbar';
//mindate={new Date(1985,11,18)} maxdate={new Date(1995,12,31)}
//this.props.history.push('/path')
//e => console.log(e.date.toLocaleDateString())

// const ProtectedComponent = () => {
//       return <Navigate to="/" />
//     }

function CH_Calendar(props){
    const navigate = useNavigate();

    const navToHomepage = () => {
        navigate('/');
    };

    return (
        <div className="Calendar">
            <div>
                <Toolbar pageSelected="Calendar"/>
            </div>
            <div>
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