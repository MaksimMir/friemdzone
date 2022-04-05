import { makeObservable, observable, action, runInAction } from 'mobx';

class Feedback {
    feedbackList = [];

    isElement = (id) => this.feedbackList.some(el => el.id === id);

    createList = async () => {
        const list = await fetch('/api/feedback').then(res => res.json());
        runInAction(() => {
            for(let i = 0; i <= 3; i++) {
                const id = Math.floor(Math.random() * (list.length))
                if (!this.isElement(list[id].id)) {
                    this.feedbackList.push(list[id])
                }
            }
        });
    }

    constructor() {
        makeObservable(this, {
            feedbackList: observable,
            createList: action
        })
    }
}

export default new Feedback();