import { makeObservable, observable, action, runInAction } from 'mobx';

class Warning {
    openBar = false;
    barMessage = null;
    
    onOpenBar = (message) => {
        this.openBar = true;
        this.barMessage = message;
    }

    onCloseBar = () => {
        setTimeout(() => {
            runInAction(() => {
                this.openBar = false;
                this.barMessage = null;
            })
        }, 4000)
    }

    constructor() {
        makeObservable(this, {
            openBar: observable,
            barMessage: observable,
            onOpenBar: action,
            onCloseBar: action
        })
    }
}

export default new Warning();