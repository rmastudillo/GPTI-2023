import { getFilteredProducts, getProducts } from "@/api/modules/default";
import { CartItem } from "@/types/common";
import { defineStore } from "pinia";

interface State {
  items: CartItem[];
  loading: boolean;
  searchBar: string;
  filteredItems: CartItem[];
}

export const useCartStore = defineStore({
  id: "cart",
  state: (): State => ({
    items: [],
    loading: false,
    searchBar: "",
    filteredItems: [],
  }),
  getters: {},
  actions: {
    async getProducts() {
      this.items = [];
      this.loading = true;
      try {
        const response = await getProducts();
        const data = response.data as CartItem[];
        this.items = data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getFilteredItems(query: any) {
      this.filteredItems = [];
      this.loading = true;
      try {
        const response = await getFilteredProducts(query);
        const data = response.data?.productos_encontrados as CartItem[];
        this.filteredItems = data;
        console.log(query);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    setSearchBar(value: string) {
      this.searchBar = value;
    },
  },
  persist: true,
});
