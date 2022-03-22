import { Box, List, ListItem, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import messanger from "../../../Store/messanger";

const MessageBody = () => {
    const { messageList, getMessageList } = messanger;

    const list = messageList.map(el => {
        return (
            <ListItem key={el.id}>
                <Box sx={{ fontSize: 14, fontWeight: 600 }}>{ el.user_name } :
                <Typography sx={{ fontSize: 12, color: 'white'}}>{ el.message }</Typography>
                </Box>
            </ListItem>
        )
    })
    useEffect(() => {
        getMessageList();
    })
    return (
        <Box sx={{ minHeight: 350, border: '1px solid', borderColor: deepOrange[500], borderRadius: '4px 4px 30px 30px', padding: '10px 5px', boxSizing: 'border-box' }}>
            <List sx={{ height: 300, overflowY: 'scroll' }}>
                { list }
            </List>
        </Box>
    )
}

export default observer(MessageBody);