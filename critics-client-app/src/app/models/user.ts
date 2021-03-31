export interface User {
  id:0,
  name: string;
  username: string;
  email: string;
  // email_verified_at: string | null;
  description: string | null;
  avatar: string | null;
  // created_at: string | null;
  // updated_at: string | null;
  follows?:User[];
  followers?:User[];
}

export interface UserFormValues {
  email:string;
  password:string;
  username?:string;
  name?:string;
}

export interface UserWithToken{
  user:User,
  token:string
}