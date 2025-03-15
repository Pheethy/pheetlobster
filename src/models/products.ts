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

export class CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.description = description;
  }
}
