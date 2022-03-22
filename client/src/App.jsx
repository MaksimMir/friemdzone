import React from 'react';
import { authContext } from './Contexts/auth.context';
import useAuth from './Hooks/auth.hook';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Pages/StartPage/StartPage';
import HomePage from './Pages/HomePage/HomePage';

const App = () => {
    let { login, logout, token, userId, userName } = useAuth();
    const isAuthentificated = !!token;
    // const routes = UseRoutes(isAutentificated);
    return (
        <authContext.Provider value={{login, logout, token, userId, userName, isAuthentificated}}>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route index path="/home" element={<HomePage />} />
            </Routes>           
        </authContext.Provider>
    )
}

export default App;