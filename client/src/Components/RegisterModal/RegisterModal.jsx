import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Dialog,  
    DialogContent, 
    DialogTitle,  
    TextField } from '@mui/material';
import useHttp from '../../Hooks/http.hooks';
import { observer } from 'mobx-react-lite';
import store from '../../Store/store';
import warningBar from '../../Store/warningBar';

const RegisterModal = () => {
    const { onOpenBar, onCloseBar } = warningBar;
    const { openReg, togglerReg } = store;
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
            onOpenBar(data.message);
            onCloseBar();
            if (data) {
                togglerReg();
            }
        } catch (error){};
    }

    const handleClose = () => {
        togglerReg();
    }

    useEffect(() => {
        if (error) {
            onOpenBar(error)
        }
        onCloseBar();
        
        cleanError();
    }, [error, cleanError,onOpenBar, onCloseBar])

    return (
        <>
            <Dialog
                open={openReg}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {'Регистрация'}
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        paddingX: '40px'
                    }}
                >
                <TextField
                    label="Nickname"
                    placeholder='John'
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='nickname'
                    value={formData.nickname}
                    onChange={changeHandler}
                    />
                <TextField
                    label="Имя"
                    placeholder='Иван'
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='firstname'
                    value={formData.firstname}
                    onChange={changeHandler}
                    />
                <TextField
                    label="Фамилия"
                    placeholder='Петров'
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='lastname'
                    value={formData.lastname}
                    onChange={changeHandler}
                    />
                <TextField
                    label="Телефон"
                    placeholder='+7(000)000-00-00'
                    type="text"
                    autoComplete="current-text"
                    variant="standard"
                    name='phone'
                    value={formData.phone}
                    onChange={changeHandler}
                    />
                <TextField
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="standard"
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    />
                <TextField
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    />
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={regiterHandler}
                    disabled={loading}
                >
                    Зарегестрироваться
                </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default observer(RegisterModal);