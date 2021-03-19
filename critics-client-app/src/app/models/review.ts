export interface Review {
    id: number,
    user_id:number,
    title: string,
    film_title:string,
    cover:string,
    year:string,
    opinion:string,
    genres:string,
    rating:number,
    film_id:number,
    comment: []
}