import * as React from 'react';
import { 
    AppBar, 
    Box, 
    Toolbar, 
    Container, 
    Button } from '@mui/material';
import useHttp from '../../Hooks/http.hooks';
import { indigo } from '@mui/material/colors';
import { observer } from 'mobx-react-lite';
import info from '../../Store/info';
import events from '../../Store/events';
import card from '../../Store/card';

const pages = [
    {event: 'cinema', trans: 'Кино'},
    {event: 'theater', trans: 'Театр'},
    {event: 'museum', trans: 'Музей'},
    {event: 'create', trans: 'Создать мероприятие'},
];


const ButtonBar = () => {
    const { togglerCard } = card;
    const { togglerEvt } = info;
    const { createList, togglerList } = events;
    const { request } = useHttp();
    
    const handleNavMenu = async (evt) => {
      evt.preventDefault();
      const event = evt.target.name;
      
      switch(event) {
        case 'Кино':
          try {
            const data = await request(`/api/event/${event}`, 'GET');
            createList(data, 'cinema');
            togglerList(true);
            togglerEvt(false);
            togglerCard(false);
          } catch (error) {};
          break;
        case 'Театр':
          try {
            const data = await request(`/api/event/${event}`, 'GET');
            createList(data, 'theater');
            togglerList(true);
            togglerEvt(false);
            togglerCard(false);
          } catch (error) {};
          break;
        case 'Музей':
          try {
            const data = await request(`/api/event/${event}`, 'GET');
            createList(data, 'museum');
            togglerList(true);
            togglerEvt(false);
            togglerCard(false);
          } catch (error) {};
          break;  
        case 'Создать мероприятие':
          togglerEvt(true);
          togglerList(false);
          togglerCard(false);
          break;
        default:
          break;
      }
    };

  return (
    <AppBar 
      position="static"
      sx={{
          bgcolor: indigo[600], 
          border: '3px solid', 
          borderRadius: '50px', 
          borderColor: indigo[900], 
          boxShadow: '0 0 10px #1a237e inset', 
          marginY: '10px'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'space-around' 
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.event}
                name={page.trans}
                onClick={handleNavMenu}
                sx={{ my: 2, color: 'white', display: 'block'}}
              >
                {page.trans}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default observer(ButtonBar);