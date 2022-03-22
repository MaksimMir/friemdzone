import { makeObservable, observable, action } from 'mobx';

class Auth {
    openAuth = false;
    openReg = false;
    
    togglerAuth = () => {
        if (this.openAuth === false) {
            return this.openAuth = true;
        } else {
            return this.openAuth = false;
        }
    }

    togglerReg = () => {
        if (this.openReg === false) {
            return this.openReg = true;
        } else {
            return this.openReg = false;
        }
    }

    constructor() {
        makeObservable(this, {
            openAuth: observable,
            openReg: observable,
            togglerAuth: action,
            togglerReg: action
        })
    }
}

export default new Auth();