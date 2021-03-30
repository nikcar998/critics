import { Like } from "./like";
import { User } from "./user";

export interface Comment {
    id: number,
        user_id: number,
        review_id: number,
        parent_id: number | null,
        body: string,
        replies: Comment[],
        user?: User ,
        likes: Like[]
}

export interface CommentFormValues{
    user_id: number,
    body: string,
    review_id: number,
    parent_id: number | null,
    error:string[] | null
}