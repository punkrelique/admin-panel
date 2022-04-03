import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Contents from "./pages/Contents";
import Sidebar from "./components/Sidebar";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <BrowserRouter>
            <App/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/Users" element={<Home/>}/>
                <Route path="/Contents" element={<Contents/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

