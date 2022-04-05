import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Users from "./pages/Users";
import Content from "./pages/Content";
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
                <Route path="/Users" element={<Users/>}/>
                <Route path="/Contents" element={<Content/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

