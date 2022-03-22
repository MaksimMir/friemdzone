import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    TextField } from '@mui/material';
import useHttp from '../../Hooks/http.hooks';
import { observer } from 'mobx-react-lite';
import store from '../../Store/store';

const RegisterModal = () => {
    const { openReg, togglerReg } = store;
    const [ message, setMessage ] = useState(null);
    const [ formData, setFormData ] = useState({
                                            nickname: '',
                                            firstname: '',
                                            lastname: '',
                                            phone: '',
                                            email: '',
                                            password: ''   
                                        });

    const changeHandler = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    const { request, loading, error, cleanError } = useHttp();
    
    const regiterHandler = async (evt) => {
        evt.preventDefault();

        try {
            const data = await request('/api/auth/register', 'POST', {...formData});
            console.log(data.message);
        } catch (error){};

        if (!error) {
            togglerReg();
        }
    }

    const handleClose = () => {
        togglerReg();
    }

    useEffect(() => {
        setMessage(error)
        cleanError();
    }, [error, cleanError])

    return (
            <Dialog
                open={openReg}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {'Entry in site'}
                </DialogTitle>
                <DialogContent>
                <TextField
                    id="standard-basic-nickname"
                    label="Nickname"
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='nickname'
                    value={formData.nickname}
                    onChange={changeHandler}
                    />
                <TextField
                    id="standard-basic-firstname"
                    label="Firstname"
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='firstname'
                    value={formData.firstname}
                    onChange={changeHandler}
                    />
                <TextField
                    id="standard-basic-lastname"
                    label="Lastname"
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='lastname'
                    value={formData.lastname}
                    onChange={changeHandler}
                    />
                <TextField
                    id="standard-basic-phone"
                    label="Phone"
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='phone'
                    value={formData.phone}
                    onChange={changeHandler}
                    />
                <TextField
                    id="standard-basic-email"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="standard"
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    />
                </DialogContent>
                <DialogActions>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={regiterHandler}
                    disabled={loading}>
                    Зарегестрироваться
                </Button>
                </DialogActions>
                <DialogContentText>{ message }</DialogContentText>
            </Dialog>
    )
}

export default observer(RegisterModal);