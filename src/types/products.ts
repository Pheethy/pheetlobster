import { Image } from "./images";
import { Category } from "./categories";

export interface ProductQueryParams {
  search_word: string;
  page: number;
  per_page: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;

  images: Image[];
  categories: Category[];
}

export interface ProductsResp {
  page: number;
  per_page: number;
  total_page: number;
  total_rows: number;
  products: Product[];
}
