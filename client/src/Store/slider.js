import { makeObservable, observable, action, runInAction } from 'mobx';
// const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=86a768861a24f5b7faa57250db3980ee&language=ru-RU';
class Billbord {
    posterCard = {};
    postersList = [];

    isPoster = (id) => this.postersList.some(el => el.id === id);

    createPosters = async () => {       
        const list = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&type=film&yearFrom=2021&yearTo=2022&description=true', {
            method: 'GET',
            headers: {
                'X-API-KEY': '66bad158-b2d0-47d0-b623-f490e1b556d6',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json());

        runInAction(() => list.items.forEach(el => {
            if (!this.isPoster(el.kinopoiskId)) {
                this.postersList.push(el)
            }
            this.posterCard = list.items[0];
        }));
    }

    getPosterCard = (id) => {
        this.posterCard = this.postersList.find(el => el.kinopoiskId === +id);
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