import {makeAutoObservable} from "mobx";
import {film} from "../interfaces/api/film.ts";
import axios from "axios";
import {randomFilm} from "./default-values/films/random-film.ts";
import {oneFilm} from "./default-values/films/one-film.ts";
import {getItem} from "../utils/localStorage.ts";

class Films {
    constructor() {
        makeAutoObservable(this);
    }

    films: film[] = [];
    productionFilms: film[] = [];
    genreFilms: film[] = [];
    searchFilms: film[] = [];

    random: film = randomFilm;
    oneFilm: film = oneFilm;

    isErrorCards = false;


    async getAllFilms() {
        await axios.get(`${import.meta.env.VITE_API_URL}/film/get_all`).then(res => {
            this.films = res.data;
        }).catch((err) => {
            console.log(err);
        })
    }

    async getTenFilms(limit: number, after: number) {
        await axios.post(`${import.meta.env.VITE_API_URL}/film/get_limit/`, {
            limit: limit,
            after: after
        }).then(res => {
            this.isErrorCards = false;

            if (after >= 1) {
                this.films = this.films.concat(...res.data);
            } else {
                this.films = res.data;
            }

        }).catch((err) => {
            console.log(err);
            this.isErrorCards = true;
            console.log(this.isErrorCards);
        });
    }

    async getRandom() {
        await axios.get(`${import.meta.env.VITE_API_URL}/film/get_random`).then(res => {
            this.random = res.data;
        }).catch((err) => {
            console.log(err);
        });
    }

    async getByGenre(genreTitle: string) {
        await axios.get(`http://localhost:${import.meta.env.VITE_API_PORT}/genre/get_film_by_genre/${genreTitle}`).then(res => {
            this.genreFilms = res.data;
        }).catch((err) => {
            console.log(err);
        })
    }

    async getByInputValue(inputValue: string) {
        await axios.get(`http://localhost:${import.meta.env.VITE_API_PORT}/film/search/${inputValue}`).then(res => {
            this.searchFilms = res.data;
        }).catch((err) => {
            console.log(err);
        })
    }

    async getOneFilm(filmId: number) {
        await axios.get(`http://localhost:${import.meta.env.VITE_API_PORT}/film/get_one/${filmId}`).then(res => {
            this.oneFilm = res.data;
        }).catch((err) => {
            console.log(err);
        })
    }

    async getProductionFilms(prodId: number) {
        if (getItem("token")) {
            await axios.get(`${import.meta.env.VITE_API_URL}/film/get_by_prodId/${prodId}`).then(res => {
                this.productionFilms = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }

}

export default new Films();