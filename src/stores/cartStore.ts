import { defineStore } from "pinia";

export interface CartItem {
  name: string;
  price: string;
}

interface State {
  selectedItems: CartItem[];
}

export const useCartStore = defineStore({
  id: "cart",
  state: (): State => ({
    selectedItems: [],
  }),
  getters: {
    getItems(state: State): CartItem[] {
      return state.selectedItems;
    },
  },
  actions: {
    addItem(item: CartItem) {
      this.selectedItems.push(item);
    },
    removeItem(item: CartItem) {
      this.selectedItems = this.selectedItems.filter(
        (i) => i.name !== item.name
      );
    },
  },
  persist: true,
});
