import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import FilmStore from "./filmStore";
import ReviewStore from "./reviewStore";
import UserStore from "./userStore";

interface Store {
    filmStore: FilmStore,
    reviewStore: ReviewStore,
    commentStore: CommentStore,
    userStore:UserStore;
    commonStore: CommonStore;
}

export const store: Store = {
    filmStore: new FilmStore(),
    reviewStore: new ReviewStore(),
    commentStore: new CommentStore(),
    userStore:new UserStore(),
    commonStore:new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}