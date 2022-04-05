import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent,  
    DialogTitle, 
    TextField } from '@mui/material';
import { orange } from '@mui/material/colors';
import useHttp from '../../Hooks/http.hooks';
import { authContext } from '../../Contexts/auth.context';
import { observer } from 'mobx-react-lite';
import store from '../../Store/store';
import warningBar from '../../Store/warningBar';


const AuthModal = () => {
    const auth = useContext(authContext);
    const { onOpenBar, onCloseBar } = warningBar;
    const { openAuth, togglerAuth } = store;
    const [ formData, setFormData ] = useState({
                                            email: '',
                                            password: ''   
                                        });
    
    const changeHandler = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    const { request, loading, error, cleanError } = useHttp();

    const authHandler = async (evt) => {
        evt.preventDefault();

        try {
            const data = await request('/api/auth/login', 'POST', {...formData});
            auth.login(data.token, data.userId, data.userName);
            if (data) {
                togglerAuth();
            }
        } catch (error){};
    }

    const handleClose = () => {
        togglerAuth();
    }

    useEffect(() => {
        if (error) {
            onOpenBar(error)
        };
        onCloseBar();
        cleanError();
    }, [error, cleanError, onOpenBar, onCloseBar])

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
            </Dialog>
    )
}

export default observer(AuthModal);