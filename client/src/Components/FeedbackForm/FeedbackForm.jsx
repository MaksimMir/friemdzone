import React, { useState} from "react";
import { 
    Box, 
    FormControl, 
    Button, 
    Typography, 
    TextField, 
    styled } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { indigo } from '@mui/material/colors';
import { observer } from 'mobx-react-lite';
import useHttp from "../../Hooks/http.hooks";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import warningBar from '../../Store/warningBar';

const MessageTextField = styled(TextField)({
    '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root' : {
        color: 'white'
    },
    '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
        color: 'white'
    },
    '.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root': {
        color: 'white',
    },
    '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root' : {
        color: 'white'
    },
    '& label.Mui-focused': {
        color: deepOrange[500],
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: deepOrange[500],
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: deepOrange[500],
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: deepOrange[500],
        },
    },
});

const ColorButton = styled(Button)(() => ({
    color: 'white',
    marginTop: '8px',
    backgroundColor: deepOrange[500],
        '&:hover': {
            backgroundColor: deepOrange[700],
        },
}));

const FeedbackForm = () => {
    const { onOpenBar, onCloseBar } = warningBar;
    const { request } = useHttp();
    const [ formData, setFormData ] = useState({
                                                name: '',
                                                message: ''
                                            });

    const handlerChange = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    const submitMessage = async (evt) => {
        evt.preventDefault();
        try {
            const data = await request('/api/feedback', 'POST', {...formData});
            onOpenBar(data.message);
            onCloseBar();
            if (data) {
                setFormData({ name: '', message: ''})
            }
        } catch (error) {};
    }

    return (
        <Box  
            sx={{
                bgcolor: indigo[600], 
                border: '3px solid', 
                borderRadius: '50px', 
                borderColor: indigo[900], 
                boxShadow: '0 0 10px #1a237e inset', 
                padding: '15px 7px', 
                boxSizing: 'border-box', 
                marginY: '10px', 
                display: 'flex', 
                justifyContent: 'space-around' 
            }}>
            <FormControl 
                sx={{ 
                    padding: '20px 10px', 
                    width: '400px'
                }}>
                <MessageTextField
                    label="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handlerChange}
                />
                <MessageTextField 
                    margin="normal"
                    label="Сообщение"
                    maxRows={2}
                    multiline
                    name="message"
                    value={formData.message}
                    onChange={handlerChange}
                />
                <ColorButton onClick={submitMessage} variant="contained">Отправить</ColorButton>
            </FormControl>
            <Box 
                sx={{ 
                    width: 400, 
                    padding: '20px 10px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center' 
                }} >
                <Typography align="center" variant="h6">Внимание!</Typography>
                <Typography 
                    sx={{ 
                        fontSize: '14px', 
                        fontWeight: 500, 
                        lineHeight: '24px', 
                        textAlign: 'center' 
                    }}>
                    Здесь вы можете оставить свой комментарий или пожелание к разработчикам. Мы с удовольствием рассмотрим все ваши предложения.
                </Typography>
                <HistoryEduIcon />
            </Box>
        </Box>
    )
}

export default observer(FeedbackForm);