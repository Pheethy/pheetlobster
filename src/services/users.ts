import axios from "axios";
import { User, UserPassport, UserSignUp } from "../models/users";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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

  public async signIn(user: User): Promise<UserPassport> {
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("password", user.password);
      const response = await this.axiosInstance.post<{
        passport: UserPassport;
      }>(`${ENDPOINTS.user}/sign-in`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.passport;
    } catch (error) {
      console.error("SignIn error:", error);
      throw new Error("An unexpected error occurred");
    }
  }

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
      }>(`${ENDPOINTS.user}/sign-up`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SignUp API response:", response);
      return response.data.passport;
    } catch (error) {
      console.error("SignUp error:", error);
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
