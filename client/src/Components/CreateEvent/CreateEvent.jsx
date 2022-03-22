import { List, ListItem, TextField, MenuItem, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { authContext } from "../../Contexts/auth.context";
import useHttp from "../../Hooks/http.hooks";
import { observer } from 'mobx-react-lite';
import info from '../../Store/info';

const currencies = ['Кино', 'Театр', 'Музей'];
const numbers = [1, 2, 3, 4, 5];

const CreateEvent = () => {
    const { togglerEvt } = info;
    const [ formData, setFormData ] = useState({
                                                    event: 'Кино',
                                                    name: '',
                                                    time: '',
                                                    place: '',
                                                    number: 1,
                                                    message: ''
                                                });

    const handlerChange = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }
    
    const { token } = useContext(authContext);
    const { request } = useHttp();

    const handlerSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const data = await request('/api/event/generate', 'POST', {...formData}, {
                Authorization: `Bearer ${token}`
            });
            console.log(data);
        } catch (error) {};

        togglerEvt();
    }    

    return (
        <List sx={{backgroundColor: 'white', padding: '20px', borderRadius: '50px'}}>
            <ListItem sx={{display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    sx={{width: '100px'}}
                    select
                    size="small"
                    variant="standard"
                    name="event"
                    value={formData.event}
                    onChange={handlerChange}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    sx={{width: '100px'}}
                    required
                    select
                    variant="standard"
                    size="small"
                    name="number"
                    value={formData.number}
                    onChange={handlerChange}
                >
                    {numbers.map((num) => (
                        <MenuItem key={num} value={num}>
                        {num}
                        </MenuItem>
                    ))}
                </TextField>
            </ListItem>
            <ListItem>
                <TextField
                    sx={{width: '100%'}}
                    required
                    size="small"
                    variant="standard"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handlerChange}
                 />
            </ListItem>
            <ListItem>
                <TextField
                    required
                    sx={{width: '100%'}}
                    variant="standard"
                    size="small"
                    label="Time"
                    type="data"
                    name="time"
                    value={formData.time}
                    onChange={handlerChange}
                 />
            </ListItem>
            <ListItem>
                <TextField
                    required
                    sx={{width: '100%'}}
                    variant="standard"
                    size="small"
                    label="Place"
                    name="place"
                    value={formData.place}
                    onChange={handlerChange}
                 />
            </ListItem>
            <ListItem>
                <TextField
                    multiline
                    sx={{width: '100%'}}
                    maxRows={2}
                    variant="standard"
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handlerChange}
                 />
            </ListItem>
            <ListItem>
                <Button sx={{width: '100%'}} variant="contained" onClick={handlerSubmit}>Submit</Button>
            </ListItem>
        </List>
    )
}

export default observer(CreateEvent);