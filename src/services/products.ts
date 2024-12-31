import axios, { AxiosError } from "axios";
import { Product, ProductQueryParams, ProductsResp } from "../types/products";

// 1. Constants
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_VERSION = "v1";
const ENDPOINTS = {
  products: `${BASE_URL}/${API_VERSION}/products`,
} as const;

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

// 3. API client class
export class ProductAPIClient {
  private static instance: ProductAPIClient;
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
  public static getInstance(): ProductAPIClient {
    if (!ProductAPIClient.instance) {
      ProductAPIClient.instance = new ProductAPIClient();
    }
    return ProductAPIClient.instance;
  }

  // 4. Helper method for building query string
  private buildQueryString(params: ProductQueryParams): string {
    const queryParams = new URLSearchParams();
    if (params.search_word)
      queryParams.append("search_word", params.search_word);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    return queryParams.toString();
  }

  // FetchAllProducts
  public async fetchAllProducts(
    queryParams: ProductQueryParams,
  ): Promise<ProductsResp> {
    try {
      const queryString = this.buildQueryString(queryParams);
      const response = await this.axiosInstance.get(
        `${ENDPOINTS.products}?${queryString}`,
      );

      return response.data;
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

  // Create Product
  public async createProduct(product: Product): Promise<Product> {
    try {
      const response = await this.axiosInstance.post<{ product: Product }>(
        `${ENDPOINTS.products}`,
        product,
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

export const fetchAllProducts = async (
  queryParams: ProductQueryParams,
): Promise<ProductsResp> => {
  return ProductAPIClient.getInstance().fetchAllProducts(queryParams);
};

export const createProduct = async (product: Product): Promise<Product> => {
  return ProductAPIClient.getInstance().createProduct(product);
};
