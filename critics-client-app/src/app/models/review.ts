import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export interface Review {
    id: number,
    user_id:number,
    title: string,
    film_title:string,
    cover:string,
    year:string,
    opinion:string,
    rating:number,
    film_id:number,
    comment_count: number,
    likes_count: number,
    user?:User 
}

export interface ReviewForShow{
    id: number,
    user_id:number,
    title: string,
    film_title:string,
    cover:string,
    year:string,
    opinion:string,
    rating:number,
    film_id:number,
    comment_count: number,
    likes: Like[],
    user?:User 
}