import { Box } from "@mui/material";
import { indigo } from '@mui/material/colors';
import { useEffect } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import billbord from '../../Store/slider';
import { observer } from 'mobx-react-lite';

const Slider = () => {
    const { createPosters, postersList, getPosterCard } = billbord;

    const getPoster = evt => {
        const id = evt.target.name
        getPosterCard(id)
    }

    const handleDragStart = (e) => e.preventDefault();
    let items = postersList.map(el => {
        return (
            <img  
                key={el.id} 
                src={`https://image.tmdb.org/t/p/w300/${el?.poster_path}`} 
                alt={el.original_title} 
                onDragStart={handleDragStart} 
                role="presentation"
                name={el.id} 
                onClick={getPoster}
            />
        )
    });

    useEffect(() => {       
        createPosters();
    }, [createPosters])

    return (
        <Box sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', marginY: '10px', minHeight: 300, padding: 3}}>
            <AliceCarousel 
                responsive={{320:{items: 1,}, 425: {items: 2}, 1024: {items: 4}}}  
                animationDuration={700} 
                disableButtonsControls={true}
                disableDotsControls={true}
                mouseTracking 
                items={items} />
        </Box>
    )
}

export default observer(Slider);