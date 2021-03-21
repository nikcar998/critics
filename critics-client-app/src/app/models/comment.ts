import { User } from "./user";

export interface Comment {
    id: number,
        user_id: number,
        review_id: number,
        parent_id: number,
        body: string,
        created_at: string,
        updated_at: string,
        deleted_at: string | null,
        replies: Comment[],
        user: User
}