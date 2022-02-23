import React from 'react';
import { Routes } from 'react-router-dom';
import UseRoutes from './Pages/routes';

const App = () => {
    const routes = UseRoutes(false);
    return (
        <Routes>
            { routes }
        </Routes>
    )
}

export default App;