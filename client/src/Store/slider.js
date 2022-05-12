import { makeObservable, observable, action, runInAction } from 'mobx';
const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
class Billbord {
    posterCard = {};
    postersList = [];

    isPoster = (id) => this.postersList.some(el => el.id === id);

    
    hendlerFetch = async (url, req) => {
        return await fetch(`${url}${req}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '66bad158-b2d0-47d0-b623-f490e1b556d6',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json());
    }
    

    createPosters = async () => {       
        const list = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&yearFrom=2021&yearTo=2022', {
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
        }));

        this.getPosterCard(4826246);
    }

    getVideo = async (id) => {
        const video = await this.hendlerFetch(baseUrl, `/${id}/videos`);
        console.log(video)
    }

    getPosterCard = async (id) => {
        const card = await this.hendlerFetch(baseUrl, `/${id}`);

        runInAction(() => this.posterCard = card)
    }

    constructor() {
        makeObservable(this, {
            postersList: observable,
            posterCard: observable,
            createPosters: action,
            getPosterCard: action,
            getVideo: action
        })
    }
}

export default new Billbord();