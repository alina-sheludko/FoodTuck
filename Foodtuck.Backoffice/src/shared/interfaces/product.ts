export interface IProduct {
  id: string;
  name: string;
  price: number;
  discount: number;
  category: string;
  images: string[];
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  calories?: number;
}

export interface IProductFormConfig {
  formData?: IProduct;
  productCategories: string[];
}