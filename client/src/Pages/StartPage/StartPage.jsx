import React from 'react';
import './StartPage.scss';
import { Link } from 'react-router-dom'


const StartPage = () => {

    return (
        <div className="main">
            <Link className='start_btn' to={'/home'}>
            Push
            </Link>
        </div>
    )
}

export default StartPage;