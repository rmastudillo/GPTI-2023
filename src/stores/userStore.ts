import { Cart, CartItem } from "@/types/common";
import { defineStore } from "pinia";

interface State {
  carts: Cart[];
  selectedCart: Cart;
  budget: number;
  slectedCartOptimizedByBudget: Cart[];
}
const defaultCart = {
  name: "Mi carrito",
  items: [],
  budget: 0 /* budge 0 es budged infinito */,
  deletedItems: [],
} as Cart;

export const useUserStore = defineStore({
  id: "userStore",
  state: (): State => ({
    carts: [
      defaultCart,
      {
        name: "Mi carrito2",
        items: [],
        budget: 0 /* budge 0 es budged infinito */,
        deletedItems: [],
      } as Cart,
    ],
    selectedCart: defaultCart,
    budget: 0 /* budge 0 es budged infinito */,
    slectedCartOptimizedByBudget: [],
  }),
  getters: {
    getItemCount(state: State): number {
      return state.selectedCart.items.length;
    },
    canUndo(state: State): Boolean {
      return state.selectedCart.deletedItems.length ? true : false;
    },
    getExpenses(state: State): number {
      let expenses = 0;
      state.selectedCart.items.map((item) => {
        expenses += item.precio;
      });
      return expenses;
    },
  },
  actions: {
    setNewCart(cart: Cart) {
      this.selectedCart = cart;
    },
    setUserBudget(budget: number) {
      this.budget = budget;
    },
    addToCart(item: CartItem) {
      this.selectedCart.items.push(item);
    },
    addCart(cart: Cart) {
      this.carts.push(cart);
    },
    removeCart(cart: Cart) {
      const index = this.carts.indexOf(cart);
      if (index !== -1) {
        this.carts.splice(index, 1);
      }
    },
    removeItem(item: CartItem) {
      const index = this.selectedCart.items.indexOf(item);
      if (index !== -1) {
        const removedItem = this.selectedCart.items.splice(index, 1)[0];
        this.selectedCart.deletedItems.push(removedItem);
      }
    },
    undoRemove() {
      if (this.selectedCart.deletedItems.length > 0) {
        const lastDeletedItem = this.selectedCart.deletedItems.pop();
        if (lastDeletedItem) {
          this.selectedCart.items.push(lastDeletedItem);
        }
      }
    },
  },
  persist: true,
});
