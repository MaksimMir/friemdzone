import { makeObservable, observable, action } from 'mobx';

class CreateEvent {
    openEvt = false;

    togglerEvt = () => {
        if (this.openEvt === false) {
            return this.openEvt = true;
        } else {
            return this.openEvt = false;
        }
    }
    constructor() {
        makeObservable(this, {
            openEvt: observable,
            togglerEvt: action
        })
    }
}

export default new CreateEvent();