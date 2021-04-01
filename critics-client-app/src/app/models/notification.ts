export interface Notification {
    id: string,
        type: string,
        notifiable_type: string,
        notifiable_id: number,
        data: {
            review_id: number,
            message:string,
            type: string
        },
        read_at:string,
        created_at: string,
        updated_at: string
}