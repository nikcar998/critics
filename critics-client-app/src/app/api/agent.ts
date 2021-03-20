import axios, { AxiosResponse } from "axios";
import { Film } from "../models/film";
import { PaginationExtApi } from "../models/paginationExtApi";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review } from "../models/review";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

axios.interceptors.request.use((config) => {
  //const token = localStorage.getItem("TR_token");
  //if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = `Bearer 18|o0SliifQoV49ih34zAj8THCVqHfl8kQywduP0lqN`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Movies = {
  listNowPlaying: (page: number) =>
    requests.get<PaginationExtApi<Film>>("/film/index/nowPlaying/"+page),
  listPopular: (page:number) => requests.get<PaginationExtApi<Film>>("/film/index/popular/"+page),
  listTopRated: (page:number) => requests.get<PaginationExtApi<Film>>("/film/index/topRated/"+page),
  show: (id: string) => requests.get<Film>("/film/show/" + id),
  search: (query: string) =>
    requests.get<PaginationExtApi<Film>>("/film/search/" + query),
};

const Reviews = {
  listReviews: (page: number) =>
    requests.get<PaginationMyApi<Review>>("/reviews?page=" + page),
  search: (query: string) =>
    requests.get<PaginationMyApi<Review>>("/reviews/search/" + query),
  show: (id: string) => requests.get<Review>("/reviews/" + id),
  store: (review: Review) => requests.post<Review>("/reviews", review),
  upload: (review: Review) =>
    requests.put<Review>("/reviews/" + review.id, review),
  destroy: (id: string) => requests.del("/reviews/" + id),
};

const agent = {
  Movies,
  Reviews,
};

export default agent;
