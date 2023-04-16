export interface ProductsType {
  products: SingleProductType[];
}

export interface SingleProductType {
  title: string;
  description: string;
  id: string;
  brand:string;
  thumbnail:string;
}
