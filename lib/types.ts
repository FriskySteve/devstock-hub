import { loginSchema } from "@/schema/loginSchema";
import { createAccountSchema } from "@/schema/createAccountSchema";
import z from "zod";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category?: { name: string };
};
export type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type Brand = {
  name: string;
  logoUrl: string;
};

export interface User {
  id?: number;
  password: string;
  email: string;
  phone: string;
  country: string;
  createdAt: string;
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedPrice: number;
  product: {
    name: string;
    price: number;
    images: string;
    stock: number;
    category: {
      name: string;
    };
  };
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
