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
