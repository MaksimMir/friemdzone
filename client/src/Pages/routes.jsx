import React from "react";
import { Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import StartPage from "./StartPage/StartPage";

const UseRoutes = isAutentificated => {
    if (isAutentificated) {
        return (
            <Route path="/home" element={<HomePage />} exact />
        )
    }

    if (!isAutentificated) {
        return (
            <Route index path="/" element={<StartPage />} />
        )
    }
}

export default UseRoutes;