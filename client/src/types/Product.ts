export interface Product {
  _id: string;
  name: string;
  description: string;
  category?: string | null;
  quantity: number;
  price: number;
  unit: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
