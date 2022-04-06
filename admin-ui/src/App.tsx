import React, {useState} from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import  { Route, Routes } from "react-router-dom";
import Home from "./pages/Users";
import Contents from "./pages/Content";
import { Login } from './pages/login/Login'
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
        <div className="App">
          <Sidebar/>
            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/Users" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Contents" element={<Contents/>}/>
                </Route>
            </Routes>
        </div>
  );
}

export default App;
