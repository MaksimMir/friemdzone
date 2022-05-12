import { 
    Box, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Rating, 
    CardActionArea } from "@mui/material";
import { indigo } from '@mui/material/colors';
import billbord from '../../Store/slider';
import { observer } from 'mobx-react-lite';


const Billboard = () => {
    const { posterCard } = billbord;

    const raiting = (posterCard?.ratingImdb * 50) / 100;
    return (
        <Box 
            sx={{
                bgcolor: indigo[600], 
                border: '3px solid', 
                borderRadius: '50px', 
                borderColor: indigo[900], 
                boxShadow: '0 0 10px #1a237e inset', 
                minHeight: 500, padding: '15px 7px', 
                boxSizing: 'border-box', 
                textAlign: 'center'
            }}>
                <Card 
                    sx={{ borderRadius: '50px', paddingBottom: '15px' }}
                    >
                    <CardActionArea>
                        <CardMedia
                        sx={{ height: 220 , objectFit: 'cover'}}
                        component='img'
                        image={`${posterCard?.posterUrlPreview}`}
                        alt={`${posterCard?.nameOriginal}`}
                        />
                        <CardContent sx={{ padding: '5px' }}>
                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} component="div">
                                {posterCard?.nameRu}
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ maxHeight: 150, padding: '5px' }}>
                            <Rating 
                                name="read-only" 
                                value={raiting} 
                                precision={0.1} 
                                size='small' 
                                readOnly 
                            />
                            <Typography 
                                sx={{ 
                                    fontSize: 11, 
                                    overflowY: 'scroll', 
                                    maxHeight: '120px',
                                    color: indigo[500] 
                                }} 
                            >
                                {posterCard?.description}
                            </Typography>
                        </CardContent>
                        <Typography 
                            sx={{ 
                                fontSize: 12, 
                                fontWeight: 700, 
                                marginTop: '10px',
                                color: indigo[500] 
                            }}
                        >
                            {posterCard?.year}
                        </Typography>
                    </CardActionArea>
                </Card>
        </Box>
    )
}

export default observer(Billboard);