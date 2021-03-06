import React, { useContext, useState, useEffect } from "react";
import { Button, FormControl, TextField, styled } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import useHttp from "../../../Hooks/http.hooks";
import { authContext } from "../../../Contexts/auth.context";
import { observer } from 'mobx-react-lite';
import messanger from "../../../Store/messanger";
import warningBar from "../../../Store/warningBar";

const MessageTextField = styled(TextField)({
    '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root' : {
        color: 'white'
    },
    '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
        color: 'white'
    },
    '.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root': {
        color: deepOrange[500],
        borderRadius: '30px 30px 4px 4px'
    },
    '& label.Mui-focused': {
        color: deepOrange[500],
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: deepOrange[500],
        },
        '&.Mui-focused fieldset': {
            borderColor: deepOrange[500],
        },
    },
});

const ColorButton = styled(Button)(() => ({
    color: 'white',
    backgroundColor: deepOrange[500],
        '&:hover': {
            backgroundColor: deepOrange[700],
        },
}));

const MessageForm = () => {
    const { onOpenBar, onCloseBar } = warningBar;
    const [ value, setValue ] = useState('');
    const { request, error, cleanError } = useHttp();
    const { token } = useContext(authContext);
    const { getMessageList } = messanger;

    const handleChange = evt => {
        setValue(evt.target.value)
    }

    const addMessage = async (evt) => {
        if (!value || value === '') return;
        evt.preventDefault();

        try {
            const data = await request('/api/message', 'POST', {value}, {
                Authorization: `Bearer ${token}`
            });
            onOpenBar(data.message);
            onCloseBar();
        } catch (error) {};
        getMessageList();
        setValue('');
    };

    useEffect(() => {
        if (error) {
            onOpenBar(error)
        }
        onCloseBar();
        
        cleanError();
    }, [error, cleanError,onOpenBar, onCloseBar])

    return (
        <FormControl sx={{ width: '100%'}}>
            <MessageTextField 
                style={{ color: 'white'}}
                label="Message"
                placeholder="???????? ??????????????????"
                maxRows={2}
                multiline
                value={value}
                onChange={handleChange}
            />
            <ColorButton onClick={addMessage} variant="contained">??????????????????</ColorButton>
        </FormControl>
    )
}

export default observer(MessageForm);