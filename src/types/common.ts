
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

export interface Cart { 
  cartId: string;
  selectedItems: CartItem[];
}

