import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './Homepage/Homepage';
import Profile from './Profile/Profile'
import ShowAll from './ShowAll/ShowAll';
import CH_Calendar from './Calendar/Calendar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/showAll" element={<ShowAll />} />
        <Route path="/calendar" element={<CH_Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
