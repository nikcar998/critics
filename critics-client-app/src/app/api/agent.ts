import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Comment, CommentFormValues } from "../models/comment";
import { Film } from "../models/film";
import { Like } from "../models/like";
import { PaginationExtApi } from "../models/paginationExtApi";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review } from "../models/review";
import { store } from "../stores/store";
import { history } from "../..";
import { User, UserFormValues, UserWithToken } from "../models/user";

//TODO->dopo l'implementazione del login gestire csrf qui o in userStore

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

//here i will add 1 sec wait to let compontents show loading style. It will handle errors too.
//it will return the errors from the api.
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
        history.push("/");
        toast.error("Unauthorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

//TODO -> make authorization dynamic
//here i will handle the authorization. Now is made in a static way, it will be implemented to use localStorage
//to get the user's token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("C_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "Application/json";
  if (config.method == "POST") {
    axios.get("/csrf").then(({ data }) => {
      config.headers.common["X-CSRF-TOKEN"] = data;
    });
  }

  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

///////////////////////////// MOVIES ///////////////////////////////////////////
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

////////////////////////////////// REVIEWS ///////////////////////////
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

///////////////////////// LIKES ////////////////////
const Likes = {
  // listCommentLikes: (id:number) => requests.get<Like[]>("api/comment/likes/show/"+id),
  // listReviewLikes: (id:number) => requests.get<Like[]>("api/review/likes/show/"+id),
  storeCommentLike: (id: number) =>
    requests.post<Like | string>("api/comment/likes/store/" + id),
  storeReviewLike: (id: number) =>
    requests.post<Like | string>("api/reviews/likes/store/" + id),
};

//////////////////////// COMMENTS ////////////////
const Comments = {
  showComment: (id: string) => requests.get<Comment>("api/comment/show/" + id),
  listComments: (id: number, page: number) =>
    requests.get<PaginationMyApi<Comment>>(
      `api/comment/index/${id}?page=${page}`
    ),
  storeComment: (comment: CommentFormValues) =>
    requests.post<Comment>("api/comment/store", comment),
  editComment: (id: number, comment: Comment) =>
    requests.put<Comment>("api/comment/edit/" + id, comment),
};

//TODO -> create current user route
///////////////////////// USER /////////////////
const Account = {
  current: () => requests.get<User>("/api/user/logged"),
  login: (user: UserFormValues) =>
    requests.post<UserWithToken>("/api/login", user),
  register: (user: UserFormValues) =>
    requests.post<UserWithToken>("/api/register", user),
};

const agent = {
  Movies,
  Reviews,
  Likes,
  Comments,
  Account,
};

export default agent;
