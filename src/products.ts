import productData from "./products.json";

export interface Product {
  url: string;
  title: string;
  description: string;
  image: string;
}

export const products = productData as Product[];
