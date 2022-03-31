<<<<<<< HEAD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
=======
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

>>>>>>> origin/main
