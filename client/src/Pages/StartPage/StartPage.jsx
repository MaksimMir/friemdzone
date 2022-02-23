import React, { useEffect, useState } from 'react';
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
import './StartPage.scss';
import useHttp from '../../Hooks/http.hooks';


const StartPage = () => {
    const [ open, setOpen ] = useState(false);
    const [ formData, setFormData ] = useState({
                                             email: '',
                                             password: ''   
                                        });
    
    const changeHandler = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    const { request, loading, error, cleanError } = useHttp();

    const regiterHandler = () => {
        try {
            const data = request('/api/auth/register', 'POST', {...formData});
            console.log(data)
        } catch (error){};
    }

    const authHandler = async () => {

    }

    const openModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
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
        <div className="main">
            <ColorButton variant="contained" onClick={openModal}>Go</ColorButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {'Exite from site'}
                </DialogTitle>
                <DialogContent>
                <TextField
                    id="standard-basic"
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
                <ColorButton 
                    onClick={authHandler}
                    disabled={loading}>
                        Войти
                </ColorButton>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={regiterHandler}
                    disabled={loading}>
                    Зарегестрироваться
                </Button>
                </DialogActions>
                <DialogContentText>{ error }</DialogContentText>
            </Dialog>
        </div>
    )
}

export default StartPage;