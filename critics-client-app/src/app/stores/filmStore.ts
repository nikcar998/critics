import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Film } from "../models/film";
import { Pagination } from "../models/pagination";

export default class FilmStore {
  movies: Film[] = [];
  selectedFilm: Film | null = null;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadLatest = async () => {
    this.loadingInitial = true;
    try {
      const pagination = await agent.Movies.listLatest();
      runInAction(() => {
        this.movies = pagination.results;
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };
}
