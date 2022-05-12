import { makeObservable, observable, action } from 'mobx';

class EventCard {
    openCard = false;
    card = {
        id: '',
        userName: '',
        date: '',
        place: '',
        message: '',
        guestCount: 0,
    }
    guestList = [];

    togglerCard = (flag) => {
        this.openCard = flag;
    }

    createList = (data) => {
        if (data) {
            return data.split(',');
        } else {
            return [];
        }
    }

    createCard = (data) => {
        this.card = {
            ...this.card,
            id: data.id,
            userName: data.user_name,
            date: data.events_time,
            place: data.events_place,
            message: data.message,
            guestCount: data.max_guest
        }
        this.guestList = this.createList(data.guest_list)
    }

    addUserToEvent = (user) => {
        if (+this.guestList.length < +this.card.guestCount) {
            this.guestList.push(user); 
        } else {
            return;
        }  
    }

    constructor() {
        makeObservable(this, {
            guestList: observable,
            openCard: observable,
            togglerCard: action,
            createCard: action,
            addUserToEvent: action
        })
    }
}

export default new EventCard();