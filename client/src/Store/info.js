import { makeObservable, observable, action } from 'mobx';

class CreateEvent {
    openEvt = false;

    togglerEvt = (flag) => {
        this.openEvt = flag;
    }
    
    constructor() {
        makeObservable(this, {
            openEvt: observable,
            togglerEvt: action
        })
    }
}

export default new CreateEvent();