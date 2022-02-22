import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import './Styles/style.scss';
import App from "./App.jsx";

reactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('.root')
)
