import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import './StartPage.scss';



const StartPage = () => {

    const ColorButton = styled(Button)(() => ({
        color: 'white',
        backgroundColor: orange[500],
        '&:hover': {
          backgroundColor: orange[700],
        },
      }));
    return (
        <div className="main">
            <Link to="/home">
                <ColorButton variant="contained">Go</ColorButton>
            </Link>
        </div>
    )
}

export default StartPage;