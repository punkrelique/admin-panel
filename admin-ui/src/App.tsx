import React, {useState} from 'react';
import Sidebar from "./components/Sidebar";
import  { Route, Routes } from "react-router-dom";
import Home from "./pages/Users";
import Contents from "./pages/Content";
import { Login } from './pages/login/Login'
import ProtectedRoutes from "./components/ProtectedRoutes";
import {createTheme, ThemeProvider} from "@mui/material";
import {grey, red} from "@mui/material/colors";

const appTheme = createTheme({
    palette: {
        primary: {
            main: grey[300]
        },
        error: {
            main: red[500]
        }
    }
})

function App() {
  return (
      <ThemeProvider theme={appTheme}>
        <div className="App">
            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/Users" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Contents" element={<Contents/>}/>
                </Route>
            </Routes>
        </div>
      </ThemeProvider>
  );
}

export default App;
