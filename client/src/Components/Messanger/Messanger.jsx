import { Box } from "@mui/material";
import { indigo } from '@mui/material/colors';
import MessageBody from "./MessageBody/MessageBody";
import MessageForm from "./MessageForm/MessageForm";
import { observer } from 'mobx-react-lite';

const Messanger = () => {

    return (
        <Box sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', minHeight: '500px', padding: '15px 7px', boxSizing: 'border-box', textAlign: 'center'}}>
            <MessageForm />
            <MessageBody />
        </Box>
    )
}

export default observer(Messanger);