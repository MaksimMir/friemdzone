import React, { useState } from "react";
import { Box } from "@mui/material";
import { indigo } from '@mui/material/colors';
import useHttp from "../../Hooks/http.hooks";

const Feedback = () => {
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
            console.log(data);
        } catch (error) {};
    }
    return (
        <Box  sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', minHeight: '500px', padding: '15px 7px', boxSizing: 'border-box', textAlign: 'center'}}>
        <form>
            <input type="text" name="name" value={formData.name} onChange={handlerChange} />
            <textarea name="message" cols="30" rows="10" value={formData.message} onChange={handlerChange}></textarea>
            <button onClick={submitMessage}>Submit</button>
        </form>
        </Box>
    )
}

export default Feedback;