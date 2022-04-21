import React from 'react';
import  { Route, Routes } from "react-router-dom";
import Home from "./pages/Users";
import Content from "./pages/Content";
import { Login } from './pages/login/Login'
import ProtectedRoutes from "./components/ProtectedRoutes";
import {createTheme, ThemeProvider} from "@mui/material";
import {grey, red} from "@mui/material/colors";
import User from "./components/User/User";
import CreatePlaylist from "./pages/Playlist/CreatePlaylist";

const appTheme = createTheme({
    palette: {
        secondary: {
            main: grey[700]
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
                    <Route path="/Content" element={<Content/>}/>
                    <Route path="/User/:id" element={<User/>}/>
                    <Route path="/CreatePlaylist" element={<CreatePlaylist/>}/>
                </Route>
            </Routes>
        </div>
      </ThemeProvider>
  );
}

export default App;
