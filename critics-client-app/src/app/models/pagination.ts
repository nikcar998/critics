import { Film } from "./film";

export interface Pagination<Type> {
  page: number;
  results: Type[];
  total_results: number;
  total_pages: number;
}
