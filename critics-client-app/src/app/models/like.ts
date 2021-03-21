export interface Like {
    id: number,
    user_id: number,
    likeable_id: number,
    likeable_type: string,
    deleted_at: string | null,
    created_at: string,
    updated_at: string
}