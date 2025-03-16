import axios, { AxiosError } from "axios";
import { Order } from "../models/orders";

// 1. Constants
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_VERSION = "v1";
const ENDPOINTS = `${BASE_URL}/${API_VERSION}/order`;

// 2. Error handling
class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class OrderAPIClient {
  private static instance: OrderAPIClient;
  private readonly axiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    });
  }

  // Singleton pattern
  public static getInstance(): OrderAPIClient {
    if (!OrderAPIClient.instance) {
      OrderAPIClient.instance = new OrderAPIClient();
    }
    return OrderAPIClient.instance;
  }

  public async createOrder(order: Order): Promise<Order> {
    try {
      const response = await this.axiosInstance.post<{ product: Order }>(
        `${ENDPOINTS}`,
        order,
      );

      return response.data.product;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new APIError(
          error.message,
          error.response?.status,
          error.response?.data,
        );
      }
      throw new APIError("An unexpected error occurred");
    }
  }
}

export const createOrder = async (order: Order): Promise<Order> => {
  return OrderAPIClient.getInstance().createOrder(order);
};
