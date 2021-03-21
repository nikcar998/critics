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

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    response.headers['Access-Control-Allow-Origin'] = '*';
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
  config.headers.Accept = "Application/json"
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
    requests.get<PaginationExtApi<Film>>("api/film/index/nowPlaying/"+page),
  listPopular: (page:number) => requests.get<PaginationExtApi<Film>>("api/film/index/popular/"+page),
  listTopRated: (page:number) => requests.get<PaginationExtApi<Film>>("api/film/index/topRated/"+page),
  show: (id: string) => requests.get<Film>("api/film/show/" + id),
  search: (query: string) =>
    requests.get<PaginationExtApi<Film>>("api/film/search/" + query),
};

const Reviews = {
  listReviews: (page: number) =>
    requests.get<PaginationMyApi<Review>>("api/reviews?page=" + page),
  search: (query: string) =>
    requests.get<PaginationMyApi<Review>>("api/reviews/search/" + query),
  show: (id: string) => requests.get<Review>("api/reviews/" + id),
  store: (review: Review) => requests.post<Review>("api/reviews", review),
  upload: (review: Review) =>
    requests.put<Review>("api/reviews/" + review.id, review),
  destroy: (id: string) => requests.del("api/reviews/" + id),
};

const agent = {
  Movies,
  Reviews,
};

export default agent;
