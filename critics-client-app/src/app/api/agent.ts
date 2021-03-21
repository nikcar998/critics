import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
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
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 422:
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
            throw modalStateErrors.flat();
          }
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 404:
        toast.error("not found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use((config) => {
  //const token = localStorage.getItem("TR_token");
  //if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = `Bearer 1|VSVTncHYD8S7oP7JZHav3L2HR9McOcC5Dm7rG0U8`;
  config.headers.Accept = "Application/json";
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
    requests.get<PaginationExtApi<Film>>("api/film/index/nowPlaying/" + page),
  listPopular: (page: number) =>
    requests.get<PaginationExtApi<Film>>("api/film/index/popular/" + page),
  listTopRated: (page: number) =>
    requests.get<PaginationExtApi<Film>>("api/film/index/topRated/" + page),
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
