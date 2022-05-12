import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import ButtonBar from "../../Components/ButtonBar/ButtonBar";
import TopBar from "../../Components/TopBar/TopBar";
import { authContext } from "../../Contexts/auth.context";
import MainBlock from "../../Components/MainBlock/MainBlock";
import { observer } from 'mobx-react-lite';
import warningBar from "../../Store/warningBar";
import Slider from "../../Components/Slider/Slider";
import Feedback from "../../Components/Feedback/Feedback";
import FeedbackForm from "../../Components/FeedbackForm/FeedbackForm";

const HomePage = () => {
    const { openBar, barMessage } = warningBar;
    const { isAuthentificated } = useContext(authContext);

    return (
        <>
            <TopBar flag={true} />
            <Slider />
            {isAuthentificated && <ButtonBar />}
            <MainBlock />
            <FeedbackForm />
            <Feedback />
            <TopBar flag={false} />
            <Snackbar 
                open={openBar}
                message={barMessage} 
            />
        </>
    )
}

export default observer(HomePage);