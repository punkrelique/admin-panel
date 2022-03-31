import React from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Contents from "./pages/Contents";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Sidebar/>
            <Routes>
            <Route path="/Users" element={<Home/>}/>
            <Route path="/Contents" element={<Contents/>}/>

            </Routes>
        </div>

      </BrowserRouter>
  );
}

export default App;
