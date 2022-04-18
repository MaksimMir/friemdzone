import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography, List, ListItem } from '@mui/material';
import eventcard from '../../Store/card';
import { observer } from 'mobx-react-lite';
import { authContext } from '../../Contexts/auth.context';
import useHttp from '../../Hooks/http.hooks';
import warningBar from '../../Store/warningBar';

const EventCard = () => {
  const { onOpenBar, onCloseBar } = warningBar;
    const { request, error, cleanError } = useHttp()
    const { card, togglerCard, addUserToEvent, guestList } = eventcard;
    const { userName } = React.useContext(authContext);
    const addPart = () => {
      addUserToEvent(userName);
    }
    const closeCard = async () => {
      const userList = guestList.join(',')
      try {
        const data = await request(`/api/event/card/${card.id}`, 'PUT', {userList});
        onOpenBar(data.message);
        onCloseBar();
    } catch (error) {};
      togglerCard(false);
    }

    React.useEffect(() => {
      if (error) {
          onOpenBar(error)
      }
      onCloseBar();
      
      cleanError();
  }, [error, cleanError,onOpenBar, onCloseBar])
  return (
    <Card sx={{ borderRadius: 10, padding: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary">
          {card.userName}
        </Typography>
        <Typography sx={{ fontSize: 24 }} component="div">
          {card.place}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {card.date}
        </Typography>
          {card.guestCount}
          <br />
        <List>
            {guestList?.map((el, i) => {
                return (
                <ListItem key={i}>
                    {el}
                </ListItem>
                )
            })}
        </List>
        <Typography>
            {card.message}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button size="small" onClick={addPart}>Принять участиe</Button>
        <Button size="small" onClick={closeCard}>Закрыть</Button>
      </CardActions>
    </Card>
  );
}

export default observer(EventCard);