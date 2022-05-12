import { Grid } from "@mui/material";
import Billboard from "../Billboard/Billboard";
import InfoBlock from "../InfoBlock/InfoBlock";
import Messanger from "../Messanger/Messanger";

const MainBlock = () => {
    return (
        <Grid container >
            <Grid item xs={3}>
                <Messanger />
            </Grid>
            <Grid item xs={6}>
                <InfoBlock />
            </Grid>
            <Grid item xs={3}>
                <Billboard />
            </Grid>
        </Grid>
    )
}

export default MainBlock;