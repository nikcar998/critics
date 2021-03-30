import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("C_token");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    //every time i will call the "setToken" function this reaction will 
    // check if ("this.token" != null), and set or remove the local storage item.
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("C_token", token);
        } else {
          window.localStorage.removeItem("C_token");
        }
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
