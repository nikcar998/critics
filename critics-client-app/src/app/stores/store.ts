import { createContext, useContext } from "react";
import FilmStore from "./filmStore";

interface Store {
    filmStore: FilmStore
}

export const store: Store = {
    filmStore: new FilmStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}