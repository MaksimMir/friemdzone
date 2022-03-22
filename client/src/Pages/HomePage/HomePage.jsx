import React, { useContext } from "react";
import ButtonBar from "../../Components/ButtonBar/ButtonBar";
import TopBar from "../../Components/TopBar/TopBar";
import { authContext } from "../../Contexts/auth.context";
import MainBlock from "../../Components/MainBlock/MainBlock";
import { observer } from 'mobx-react-lite';
import events from "../../Store/events";
import Slider from "../../Components/Slider/Slider";
import Feedback from "../../Components/Feedback/Feedback";

const HomePage = () => {
    const { togglerList } = events;
    const { isAuthentificated } = useContext(authContext);
    const closeWindowEvents = evt => {
        if (evt.target.tagName === 'BUTTON') {
            return;
        }
        togglerList(false)
    }
    return (
        <div onClick={closeWindowEvents}>
            <TopBar />
            {isAuthentificated && <ButtonBar />}
            <MainBlock />
            <Slider />
            <Feedback />
        </div>
    )
}

export default observer(HomePage);