export interface User {
  id:number,
  name: string;
  username: string;
  email: string;
  // email_verified_at: string | null;
  description: string | null;
  avatar: string | null;
  // created_at: string | null;
  // updated_at: string | null;
  follows_count:number;
  followers_count:number;
}

export interface UserFormValues {
  email:string;
  password:string;
  username?:string;
  name?:string;
}
export interface UserEditFormValues {
  description:string;
  username:string;
  name:string;
}

export interface UserWithToken{
  user:User,
  token:string
}