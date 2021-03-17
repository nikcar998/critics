import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Film } from "../models/film";
import { Pagination } from "../models/pagination";

export default class FilmStore {
  movies: Film[] = [];
  selectedFilm: Film | null = null;
  loadingInitial = false;
  whatToLoad = "nowPlaying";

  constructor() {
    makeAutoObservable(this);
  }

  changeWhatToLoad = (query: string) => {
    this.whatToLoad = query;
    console.log(this.whatToLoad)
  }


  loadMovies = async () => {
    this.loadingInitial = true;
    switch (this.whatToLoad) {
      case "nowPlaying":
        try {
          const pagination = await agent.Movies.listNowPlaying();
          runInAction(() => {
            this.movies = pagination.results;
            this.loadingInitial = false;
          });
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
        break;
      case "popular":
        try {
          const pagination = await agent.Movies.listPopular();
          runInAction(() => {
            this.movies = pagination.results;
            this.loadingInitial = false;
          });
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
        break;
      case "top rated":
      default:
        try {
          const pagination = await agent.Movies.listTopRated();
          runInAction(() => {
            this.movies = pagination.results;
            this.loadingInitial = false;
          });
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
        break;
    }
  };
}
