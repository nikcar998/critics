import axios, { AxiosResponse } from "axios";
import { Film } from "../models/film";
import {Pagination} from "../models/pagination";


const sleep = (delay: number) => {
  return new Promise((resolve)=>{
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

axios.interceptors.request.use((config) => {
  //const token = localStorage.getItem("TR_token");
  //if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = `Bearer 18|o0SliifQoV49ih34zAj8THCVqHfl8kQywduP0lqN`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, query?: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Movies = {
  listNowPlaying: () => requests.get<Pagination<Film>>("/film/index/nowPlaying"),
  listPopular: () => requests.get<Pagination<Film>>("/film/index/popular"),
  listTopRated: () => requests.get<Pagination<Film>>("/film/index/topRated"),
  show: (id:string) => requests.get<Film>("/film/show/"+ id),
  search: (query: string) => requests.get<Pagination<Film>>("/film/search/"+ query),
};

const agent = {
  Movies,
};

export default agent;
