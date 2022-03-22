import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { indigo } from '@mui/material/colors';
import billbord from '../../Store/slider';
import { observer } from 'mobx-react-lite';


const Billboard = () => {
    const { posterCard } = billbord;

    return (
        <Box sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', minHeight: 500, padding: '15px 7px', boxSizing: 'border-box', textAlign: 'center'}}>
                <Card sx={{ borderRadius: '50px', paddingBottom: 5 }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w300/${posterCard?.backdrop_path}`}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography sx={{ fontSize: 17, fontWeight: 600 }} component="div">
                        {posterCard?.original_title}
                    </Typography>
                    </CardContent>
                    <CardContent sx={{ maxHeight: 150, overflowY: 'scroll'}}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        {posterCard?.overview}
                    </Typography>
                    </CardContent>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, textAlign: 'left', padding: 2 }} color="text.secondary">
                        {posterCard?.release_date}
                    </Typography>
                </Card>
        </Box>
    )
}

export default observer(Billboard);