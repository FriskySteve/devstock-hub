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
  category: { name: string };
};

export type Brand = {
  name: string;
  logoUrl: string;
};

export type User = {
  email: string;
  phone: string;
  password: string;
  country: string;
  createdAt: Date;
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
