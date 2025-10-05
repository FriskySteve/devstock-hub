import { loginSchema } from "@/schema/loginSchema";
import { createAccountSchema } from "@/schema/createAccountSchema";
import z from "zod";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string | null;
    phone: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      phone: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    phone: string;
  }
}

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  category?: { name: string } | undefined;
  // category: { name: string };
};

export type ProductDetails = {
  product: Product;
  deliveryDay: string;
  deliveryDay2?: string;
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

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedPrice: number;
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    category?: {
      id: number;
      name: string;
    };
  };
}

export type RegisterResponse = {
  success: boolean;
  message?: string;
};

export interface LoginParams {
  emailOrMobile: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string | null;
    phone: string | null;
  };
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
