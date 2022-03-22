import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    TextField } from '@mui/material';
import { orange } from '@mui/material/colors';
import useHttp from '../../Hooks/http.hooks';
import { authContext } from '../../Contexts/auth.context';
import { observer } from 'mobx-react-lite';
import store from '../../Store/store';


const AuthModal = () => {
    const auth = useContext(authContext);
    const { openAuth, togglerAuth } = store;
    const [ message, setMessage ] = useState(null);
    const [ formData, setFormData ] = useState({
                                            email: '',
                                            password: ''   
                                        });
    
    const changeHandler = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    const { request, loading, error, cleanError } = useHttp();

    const authHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...formData});
            auth.login(data.token, data.userId, data.userName);
        } catch (error){};
        togglerAuth();
    }

    const handleClose = () => {
        togglerAuth();
    }

    useEffect(() => {
        setMessage(error)
        cleanError();
    }, [error, cleanError])

    const ColorButton = styled(Button)(() => ({
        color: 'white',
        backgroundColor: orange[500],
        '&:hover': {
          backgroundColor: orange[700],
        },
      }));
    return (
            <Dialog
                open={openAuth}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {'Authorisation'}
                </DialogTitle>
                <DialogContent>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="standard"
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    />
                <TextField
                    fullWidth
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
                <ColorButton 
                    variant='contained' 
                    onClick={authHandler}
                    disabled={loading}>
                    Вход
                </ColorButton>
                </DialogActions>
                <DialogContentText>{ message }</DialogContentText>
            </Dialog>

    )
}

export default observer(AuthModal);