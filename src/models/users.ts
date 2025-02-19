import { Image } from "./images";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
  images: Image[];
}

export interface UserSignUp {
  email: string;
  username: string;
  password: string;
  files: File[];
}

export interface Token {
  oauth_id: string;
  access_token: string;
  refresh_token: string;
}

export interface UserPassport {
  user: User;
  token: Token;
}
