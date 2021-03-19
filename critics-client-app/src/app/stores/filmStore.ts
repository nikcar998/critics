import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Film } from "../models/film";
import { PaginationExtApi } from "../models/paginationExtApi";

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
    console.log(this.whatToLoad);
  };

  loadMovies = async () => {
    this.setLoadingInitial(true);
    this.loadingInitial = true;
    switch (this.whatToLoad) {
      case "nowPlaying":
        try {
          const pagination = await agent.Movies.listNowPlaying();
          runInAction(() => {
            this.movies = pagination.results;
          });
          this.setLoadingInitial(false);
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
        break;
      case "popular":
        try {
          const pagination = await agent.Movies.listPopular();
          runInAction(() => {
            this.movies = pagination.results;
          });
          this.setLoadingInitial(false);
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
        break;
      case "top rated":
      default:
        try {
          const pagination = await agent.Movies.listTopRated();
          runInAction(() => {
            this.movies = pagination.results;
          });
          this.setLoadingInitial(false);
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
        break;
    }
  };

  searchFilm = async (query: string) => {
    if (query.length > 2) {
      this.setLoadingInitial(true);
      try {
        const pagination = await agent.Movies.search(query);
        runInAction(() => {
          this.movies = pagination.results;
        });
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
