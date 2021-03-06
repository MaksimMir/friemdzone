import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { indigo } from '@mui/material/colors';
import { observer } from 'mobx-react-lite';
import feedback from "../../Store/feedback";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Feedback = () => {
    const { createList, feedbackList } = feedback;

    const handleDragStart = (e) => e.preventDefault();
    let items = feedbackList?.map(el => {
        const date = new Date(el.create_at);
        return (
            <Box 
                key={el.id}
                sx={{ 
                    bgcolor: 'rgba(#3949ab, .5)', 
                    borderRadius: 20, 
                    width: 700, 
                    marginX: 'auto' 
                }}
                onDragStart={handleDragStart} 
                role="presentation"
            >
                <Typography 
                    sx={{ 
                        fontSize: '17px', 
                        fontWeight: 600, 
                        textAlign: 'left',
                        paddingBottom: '5px'
                    }}
                >
                        {el.user_name}
                </Typography>
                <Typography 
                    sx={{ 
                        fontSize: '14px', 
                        fontWeight: 400, 
                        textAlign: 'left', 
                        lineHeight: '20px',
                        paddingBottom: '5px',
                        color: 'white'
                    }}
                >
                        {el.message}
                </Typography>
                <Typography 
                    sx={{ 
                        fontSize: '8px', 
                        fontWeight: 100, 
                        textAlign: 'left'
                    }}
                >
                        {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
                </Typography>
            </Box>
        )
    });

    useEffect(() => {
        createList();
    }, [createList]);
    return (
        <Box  sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', padding: '15px 7px', boxSizing: 'border-box', textAlign: 'center', marginY: '10px' }}>
            <AliceCarousel   
                animationDuration={4000} 
                autoPlayInterval={7000}
                stopAutoPlayOnHover
                disableButtonsControls={true}
                disableDotsControls={true}
                infinite
                autoPlay
                mouseTracking 
                items={items} />
        </Box>
    )
}

export default observer(Feedback);