import { Box, Icon } from "@mui/material";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { deepOrange } from '@mui/material/colors';

const Socialy = () => {
    return (
        <Box sx={{ width: 200, display: 'flex', justifyContent: 'space-between'}}>
            <Icon sx={{ padding: '5px', borderRadius: 5, bgcolor: deepOrange[500] }}>
                <InstagramIcon />
            </Icon>
            <Icon  sx={{ padding: '5px', borderRadius: 5, bgcolor: deepOrange[500] }}>
                <YouTubeIcon />
            </Icon>
            <Icon  sx={{ padding: '5px', borderRadius: 5, bgcolor: deepOrange[500] }}>
                <TwitterIcon />
            </Icon>
            <Icon  sx={{ padding: '5px', borderRadius: 5, bgcolor: deepOrange[500] }}>
                <TelegramIcon />
            </Icon>
        </Box>
    )
}

export default Socialy;