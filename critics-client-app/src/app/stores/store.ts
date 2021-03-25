import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import FilmStore from "./filmStore";
import ReviewStore from "./reviewStore";

interface Store {
    filmStore: FilmStore,
    reviewStore: ReviewStore,
    commentStore: CommentStore
}

export const store: Store = {
    filmStore: new FilmStore(),
    reviewStore: new ReviewStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}