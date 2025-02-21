export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId?: number;
  quantity: number;
  unit: string;
  price: number;
  imageUrl?: string;
}
