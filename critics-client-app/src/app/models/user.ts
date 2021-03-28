export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  description: string | null;
  avatar: string | null;
  created_at: string | null;
  updated_at: string | null;
  password?:string
}
