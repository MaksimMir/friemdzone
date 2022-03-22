import { makeObservable, observable, action, runInAction } from 'mobx';
const url = '/api/message';
class Messanger {

    messageList = [];

    isMessage = (id) => this.messageList.some(el => el.id === id);

    getMessageList = async () => {
        const list = await fetch(url).then(res => res.json());
        runInAction(() => list.forEach(el => {
            if (!this.isMessage(el.id)) {
                this.messageList.push(el);
            }
        }))
    }

    constructor() {
        makeObservable(this, {
            messageList: observable,
            getMessageList: action
        })
    }
}

export default new Messanger();