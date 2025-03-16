export interface Order {
  id: string;
  customer_id: string;
  contact: string;
  address: string;
  status: string;
  product_order_list: OrdersProducts[];
  created_at: string;
  updated_at: string;
}

export interface OrdersProducts {
  product_id: string;
  qty: number;
  price: number;
}

export interface OrderQueryParams {
  search_word?: string;
  page?: number;
  per_page?: number;
}

export interface OrdersResp {
  orders: Order[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
