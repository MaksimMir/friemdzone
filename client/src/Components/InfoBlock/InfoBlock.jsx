import { Box, Container } from "@mui/material";
import { indigo } from '@mui/material/colors';
import CreateEvent from "../CreateEvent/CreateEvent";
import { observer } from 'mobx-react-lite';
import info from '../../Store/info';
import events from "../../Store/events";
import eventcard from '../../Store/card';
import EventsList from "../EventsList/EventsList";
import EventCard from "../EventCard/EventCard";
import image from '../../Images/company.jpg';

const InfoBlock = () => {
    const { openEvt } = info;
    const { openList } = events;
    const { openCard } = eventcard;
    return (
        <Box 
            sx={{ 
                border: '3px solid', 
                borderRadius: '50px', 
                borderColor: indigo[900], 
                boxShadow: '0 0 10px #1a237e inset', 
                minHeight: '500px', 
                padding: '15px 7px', 
                boxSizing: 'border-box', 
                textAlign: 'center', 
                background: `url(${image}) no-repeat center`, 
                backgroundSize: 'cover'
            }}
        >
            <Container>
            { openEvt && <CreateEvent /> }
            { openList && <EventsList /> }
            { openCard && <EventCard /> }
            </Container>
        </Box>
    )
}

export default observer(InfoBlock);