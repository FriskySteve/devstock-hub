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
