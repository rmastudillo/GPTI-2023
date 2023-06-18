export interface ResponseData {
  [category: string]: subCategory;
}
interface subCategory {
  [category: string]: Product;
}

interface Product {
  [productName: string]: ProductInfo;
}

interface ProductInfo {
  precio: number;
  supermercado: string;
  url_imagen: string;
}

export interface CartItem {
  nombre: string;
  precio: number;
  url_imagen: string;
  supermercado: string;
}

export interface Categorias {
  [key: string]: string[];
}

export interface QueryParams {
  search?: string;
  categoria?: string;
  subcategoria?: string;
  supermercado?: string;
}
