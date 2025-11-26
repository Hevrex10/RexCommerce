export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  instock: boolean;
  detail: string;
  reviews: Review[];
  colors: string[];
  sizes: string[];
  tags: string[];
  created_at: string; // ISO date string
  updatedat: string; // ISO date string
}

export interface Cart {
  id: string | number;
  price: number;
  name: string;
  image: string;
  quantity: number;
  totalPrice: number;
  itemSize: string;
  itemColor: string;
  date:string;
  user_id?: string;
}
