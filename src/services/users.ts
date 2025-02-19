import axios from "axios";
import { User, UserPassport, UserSignUp } from "../models/users";

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_URL = "http://127.0.0.1:8080";
const API_VERSION = "v1";
const ENDPOINTS = {
  user: `${BASE_URL}/${API_VERSION}/user`,
} as const;

export class UserAPIClient {
  private static instance: UserAPIClient;
  private readonly axiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
  }
  // Singleton pattern
  public static getInstance(): UserAPIClient {
    if (!UserAPIClient.instance) {
      UserAPIClient.instance = new UserAPIClient();
    }
    return UserAPIClient.instance;
  }

  //multipart form data
  public async signIn(user: User): Promise<UserPassport> {
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("password", user.password);
      const response = await this.axiosInstance.post<{
        passport: UserPassport;
      }>(`${ENDPOINTS.user}/sign-in`, formData);
      return response.data.passport;
    } catch (error) {
      throw new Error("An unexpected error occurred");
    }
  }

  //multipart form data
  public async signUp(user: UserSignUp): Promise<UserPassport> {
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("username", user.username);
      formData.append("password", user.password);
      if (user.files.length > 0) {
        formData.append("files", user.files[0]);
      }
      const response = await this.axiosInstance.post<{
        passport: UserPassport;
      }>(`${ENDPOINTS.user}/sign-up`, formData);
      return response.data.passport;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      // Handle axios error
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Network error occurred",
        );
      }
      // Fallback error
      throw new Error("An unexpected error occurred");
    }
  }
}

export const signIn = async (user: User): Promise<UserPassport> => {
  return UserAPIClient.getInstance().signIn(user);
};
export const signUp = async (user: UserSignUp): Promise<UserPassport> => {
  return UserAPIClient.getInstance().signUp(user);
};
