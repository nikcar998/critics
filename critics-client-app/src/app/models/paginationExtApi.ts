import { Film } from "./film";

export interface PaginationExtApi<Type> {
  page: number;
  results: Type[];
  total_results: number;
  total_pages: number;
}