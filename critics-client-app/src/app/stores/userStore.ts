import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { PaginationMyApi } from "../models/paginationMyApi";
import { User, UserEditFormValues, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  selectedUser: User | null = null;
  pagination: PaginationMyApi<User> | null = null;
  loading = false;
  page = 1;
  users: User[] = [];
    

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user.user));
      history.push("/movies");
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("C_token");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    this.setLoading(true);
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user.user));
      history.push("/movies");
    } catch (error) {
      throw error;
    }
  };



  listUser = async () => {
    this.setLoading(true);
    try {
      this.pagination = await agent.Account.listUsers(this.page);
      runInAction(()=> (this.pagination ?  this.users = this.pagination.data : null))
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

 
  selectUser = async (id: string) => {
    this.setLoading(true);
    try {
      const user = await agent.Account.details(id);
      runInAction(() => (this.selectedUser = user));
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
      throw error;
    }
  };

  searchUsers = async (query: string) => {
    if (query.length > 2) {
      this.setLoading(true);
      try {
        const pagination = await agent.Account.search(query);
        runInAction(() => {
          this.users = pagination.data;
        });
        this.setLoading(false);
      } catch (error) {
        console.log(error);
        this.setLoading(false);
      }
    }
  };

  editUser = async (user: UserEditFormValues) =>{
    this.setLoading(true)
    try{
      await agent.Account.edit(user)
      this.setLoading(false)
    }catch(error){
      console.log(error);
      this.setLoading(false);
      throw error;
    }
  }

  //function for pagination
  setPage = (plusOrNot: boolean) => {
    if (plusOrNot) {
      if (
        this.pagination &&
        this.page < this.pagination.last_page
      ) {
        this.page++;
      }
    } else {
      if (this.pagination && this.page > 1) {
        this.page--;
      }
    }
  };
   //useful to show loading component
   setLoading = (state: boolean) => {
    this.loading = state;
  };
}
