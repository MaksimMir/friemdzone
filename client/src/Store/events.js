import { makeObservable, observable, action } from 'mobx';

class EventsList {
    openList = false;
    event = '';
    eventList = {
        cinema: [],
        theater: [],
        museum: []
    };

    togglerList = (flag) => {
        this.openList = flag;
    }

    isEvent = (id, event) => this.eventList[event].some(el => el.id === id)

    createList = (data, event) => {
        this.event = event;
        data.forEach(element => {
            if (!this.isEvent(element.id, event)) {
                this.eventList[event].push(element);
            }
        });
    }

    constructor() {
        makeObservable(this, {
            openList: observable,
            eventList: observable,
            togglerList: action,
            createList: action
        })
    }
}

export default new EventsList();