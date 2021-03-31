import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  selectedUser: User | null = null;
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
      console.log(user);
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
    try {
      const user = await agent.Account.current();
      runInAction(()=> this.user = user);
    }catch (error){
      console.log(error)
    }
  }

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user.user));
      console.log(user);
      history.push("/movies");
    } catch (error) {
      throw error;
    }
  }

  
  selectUser = async (id: string) => {
    try {
      const user = await agent.Account.details(id);
      runInAction(()=> this.selectedUser = user);
    }catch (error){
      console.log(error)
      throw error;
    }
  }
}
