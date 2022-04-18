import { Box, Card, CardContent, CardMedia, Typography, Rating } from "@mui/material";
import { indigo } from '@mui/material/colors';
import billbord from '../../Store/slider';
import { observer } from 'mobx-react-lite';


const Billboard = () => {
    const { posterCard } = billbord;
    console.log(posterCard)
    const raiting = posterCard?.ratingImdb*50/100
    return (
        <Box sx={{bgcolor: indigo[600], border: '3px solid', borderRadius: '50px', borderColor: indigo[900], boxShadow: '0 0 10px #1a237e inset', minHeight: 500, padding: '15px 7px', boxSizing: 'border-box', textAlign: 'center'}}>
                <Card sx={{ borderRadius: '50px', paddingBottom: 5 }}>
                    <CardMedia
                    component="img"
                    height="240"
                    image={`${posterCard?.posterUrlPreview}`}
                    alt={`${posterCard?.nameOriginal}`}
                    />
                    <CardContent>
                    <Typography sx={{ fontSize: 17, fontWeight: 600 }} component="div">
                        {posterCard?.nameRu}
                    </Typography>
                    </CardContent>
                    <CardContent sx={{ maxHeight: 150 }}>
                    <Rating name="read-only" value={raiting} precision={0.1} size='small' readOnly />
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        {posterCard?.overview}
                    </Typography>
                    </CardContent>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }} color="text.secondary">
                        {posterCard?.year}
                    </Typography>
                </Card>
        </Box>
    )
}

export default observer(Billboard);