export interface IProduct {
  name: string;
  price: number;
  discount: number;
  category: string;
  images: string[];
  shortDescription?: string;
  description?: string;
}

export interface IProductFormConfig {
  formData?: IProduct;
  productCategories: string[];
}