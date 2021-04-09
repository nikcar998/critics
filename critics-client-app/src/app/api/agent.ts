import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Comment, CommentFormValues } from "../models/comment";
import { Film } from "../models/film";
import { Like } from "../models/like";
import { PaginationExtApi } from "../models/paginationExtApi";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review, ReviewForShow } from "../models/review";
import { store } from "../stores/store";
import { history } from "../..";
import { User, UserEditFormValues, UserFormValues, UserWithToken } from "../models/user";
import { Notification } from "../models/notification";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

/********************************* RESPONSE ************************************/
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

/********************************* REQUEST ************************************/
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("C_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "Application/json";
  config.headers.ContentType = "multipart/form-data";
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
    listAllReviews: (page: number) =>
    requests.get<PaginationMyApi<Review>>("api/reviews/all/?page=" + page),
  listUserReviews: (page: number, id: number) =>
    requests.get<PaginationMyApi<Review>>(
      "api/reviews/user/" + id + "?page=" + page
    ),
  search: (query: string) =>
    requests.get<PaginationMyApi<Review>>("api/reviews/search/" + query),
  show: (id: string) => requests.get<ReviewForShow>("api/reviews/" + id),
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

///////////////////////// USER /////////////////
const Account = {
  current: () => requests.get<User>("/api/user/logged"),
  listUsers: (page: number) =>
    requests.get<PaginationMyApi<User>>(`/api/user/list?page=${page}`),
  details: (id: string) => requests.get<User>(`/api/details/${id}`),
  search: (query: string) =>
    requests.get<PaginationMyApi<User>>("/api/user/search/" + query),
  login: (user: UserFormValues) =>
    requests.post<UserWithToken>("/api/login", user),
  register: (user: UserFormValues) =>
    requests.post<UserWithToken>("/api/register", user),
  edit: (user: UserEditFormValues) => requests.put("api/edit", user),
  editAvatar: (avatar:FormData) => requests.post("api/edit/avatar", avatar)
};

///////////////////////// FOLLOW /////////////////
const Follow = {
  isFollowing: (id: number) =>
    requests.get<boolean>("/api/follow/isFollowing/" + id),
  listFollowing: (page: number) =>
    requests.get<PaginationMyApi<User>>("api/follow/index/?page=" + page),
  listFollowers: (page: number) =>
    requests.get<PaginationMyApi<User>>(
      "api/follow/index/followers/?page=" + page
    ),
  toggleFollow: (id: number) =>
    requests.post<string>("/api/follow/toggle/" + id),
};

///////////////////////// NOTIFICATIONS /////////////////
const Notifications = {
  countUreadNotifications: () =>
    requests.get<number>("api/notifications/indexUnread"),
  list: (page: number) =>
    requests.get<PaginationMyApi<Notification>>(
      "api/notifications/index?page=" + page
    ),
  readNotifications: () =>
    requests.post<Notification[]>("api/notifications/read"),
};

const agent = {
  Movies,
  Reviews,
  Likes,
  Comments,
  Account,
  Follow,
  Notifications,
};

export default agent;
