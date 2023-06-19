import { CartItem } from "@/types/common";
import { defineStore } from "pinia";

interface State {
  budget: number;
  selectedItems: CartItem[];
  deletedItems: CartItem[];
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): State => ({
    budget: 0,
    selectedItems: [],
    deletedItems: [],
  }),
  getters: {
    getItemCount(state: State): number {
      return state.selectedItems.length;
    },
    canUndo(state: State): Boolean {
      return state.deletedItems.length ? true : false;
    },
  },
  actions: {
    setBudget(budget: number) {
      this.budget = budget;
    },
    addToCart(item: CartItem) {
      if (item.precio + this.selectedItems.reduce((total, item) => total + item.precio, 0) <= this.budget) {
        this.deletedItems = [];
        this.selectedItems.push(item);
      } else {
        alert('El presupuesto es insuficiente para añadir este producto');
      }
    },
    removeItem(item: CartItem) {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        const removedItem = this.selectedItems.splice(index, 1)[0];
        this.deletedItems.push(removedItem);
      }
    },
    undoRemove() {
      if (this.deletedItems.length > 0) {
        const lastDeletedItem = this.deletedItems.pop();
        if (lastDeletedItem) {
          this.selectedItems.push(lastDeletedItem);
        }
      }
    },
  },
  persist: true,
});
