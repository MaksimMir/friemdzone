import { makeObservable, observable, action, runInAction } from 'mobx';
const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=86a768861a24f5b7faa57250db3980ee&language=ru-RU';
class Billbord {
    posterCard = {};
    postersList = [];

    isPoster = (id) => this.postersList.some(el => el.id === id);

    createPosters = async () => {
        const list = await fetch(url).then(res => res.json());
        runInAction(() => list.results.forEach(el => {
            if (!this.isPoster(el.id)) {
                this.postersList.push(el)
            }
            this.posterCard = list.results[0];
        }));
    }

    getPosterCard = (id) => {
        this.posterCard = this.postersList.find(el => el.id === +id);
    }

    constructor() {
        makeObservable(this, {
            postersList: observable,
            posterCard: observable,
            createPosters: action,
            getPosterCard: action
        })
    }
}

export default new Billbord();