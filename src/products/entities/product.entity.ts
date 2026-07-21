export class ProductEntity {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  brand: string;
  content: string;
  image?: string | null;
  isActive: boolean;
  categoryId: number;
  createdAt: Date;
}
