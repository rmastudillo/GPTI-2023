import { getProducts } from "@/api/modules/default";
import { CartItem, ResponseData } from "@/types/common";
import { defineStore } from "pinia";

interface State {
  items: CartItem[];
  loading: boolean;
}

export const useCartStore = defineStore({
  id: "cart",
  state: (): State => ({
    items: [],
    loading: false,
  }),
  getters: {},
  actions: {
    async getProducts() {
      this.items = [];
      try {
        const response = await getProducts();
        const data = response.data as ResponseData;
        this.loadItems(data, this.items);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    loadItems(data: ResponseData, store: CartItem[]) {
      for (const category in data) {
        for (const subCategory in data[category]) {
          for (const product in data[category][subCategory]) {
            const productInfo = data[category][subCategory][product];
            const item = {
              nombre: product,
              precio: productInfo.precio,
              url_imagen: productInfo.url_imagen,
              supermercado: productInfo.supermercado,
            } as CartItem;
            store.push(item);
          }
        }
      }
    },
  },
  persist: true,
});
