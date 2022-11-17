
import Calendar from "rc-year-calendar";
import Toolbar from '../Toolbar/Toolbar';
//mindate={new Date(1985,11,18)} maxdate={new Date(1995,12,31)}

export default function App() {
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
        onDayClick={e => console.log(e.date.toLocaleDateString())}
        />
        </div>
      
    </div>
  );
}
