import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.interceptors.request.use((config) => {
    //const token = localStorage.getItem("TR_token");
    //if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `Bearer 18|o0SliifQoV49ih34zAj8THCVqHfl8kQywduP0lqN`
    return config;
  });
  
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Movies = {
    listLatest: ()=> requests.get('/film/index/latest'),
    listPopular: ()=> requests.get('/film/index/popular'),
    listTopRated: ()=> requests.get('/film/index/topRated'),
    show: ()=> requests.get('/film/index/topRated'),
    search: ()=> requests.get('/film/index/topRated'),

    
}

const agent = {
    Movies
}

export default agent;