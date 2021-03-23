import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Film } from "../models/film";
import { PaginationExtApi } from "../models/paginationExtApi";

export default class FilmStore {
  pagination: PaginationExtApi<Film> | null = null;
  movies: Film[] = [];
  selectedFilm: Film | null = null;
  loadingInitial = false;
  whatToLoad = "nowPlaying";
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  // this function will trigger the useEffect in "MoviesList.tsx", and upload another cathegory of movies
  changeWhatToLoad = (query: string) => {
    this.whatToLoad = query;
  };

  //here will be checked the value of "this.whatToLoad" and then loaded the relative kind of film
  loadMovies = async () => {
    this.setLoadingInitial(true);
    this.loadingInitial = true;
    switch (this.whatToLoad) {
      case "nowPlaying":
        try {
          this.pagination = await agent.Movies.listNowPlaying(this.page);
          if (this.pagination) {
            runInAction(() => {
              this.movies = this.pagination!.results;
            });
          }

          this.setLoadingInitial(false);
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
        break;
      case "popular":
        try {
          const pagination = await agent.Movies.listPopular(this.page);
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
          const pagination = await agent.Movies.listTopRated(this.page);
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

  //function used to store the necessary values to create a new review. ->look ReviewForm.tsx
  selectFilm = async (id: number) => {
    try {
      const stringId = id.toString();
      this.selectedFilm = await agent.Movies.show(stringId);
    } catch (error) {
      console.log(error);
    }
  };

  //this will change page -> look ButtonGroupNextBack.tsx
  setPage = (plusOrNot: boolean) => {
    if (plusOrNot) {
      if (this.pagination && this.page < this.pagination.total_pages) {
        this.page++;
      }
    } else {
      if (this.pagination && this.page > 1) {
        this.page--;
      }
    }
  };

  //useful to show loading component
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
