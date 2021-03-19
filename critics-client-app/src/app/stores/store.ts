import { createContext, useContext } from "react";
import FilmStore from "./filmStore";
import ReviewStore from "./reviewStore";

interface Store {
    filmStore: FilmStore,
    reviewStore: ReviewStore
}

export const store: Store = {
    filmStore: new FilmStore(),
    reviewStore: new ReviewStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}