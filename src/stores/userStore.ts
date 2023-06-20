import { Cart, CartItem } from "@/types/common";
import { defineStore } from "pinia";

interface State {
  carts: Cart[];
  selectedCartName: string;
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
    selectedCartName: defaultCart.name,
    budget: 0 /* budge 0 es budged infinito */,
    slectedCartOptimizedByBudget: [],
  }),
  getters: {
    getSelectedCart(state: State): Cart {
      return state.carts.find(
        (cart) => cart.name === state.selectedCartName
      ) as Cart;
    },
    getItemCount(state: State): number {
      return this.getSelectedCart.items.length;
    },
    canUndo(state: State): Boolean {
      return this.getSelectedCart.deletedItems.length ? true : false;
    },
    getExpenses(state: State): number {
      let expenses = 0;
      this.getSelectedCart.items.map((item) => {
        expenses += item.precio;
      });
      return expenses;
    },
    getCart: (state: State) => (cartName: string) => {
      const cart = state.carts.find((cart) => cart.name === cartName);
      return cart ?? state.carts[0];
    },
  },
  actions: {
    setNewCart(cart: Cart) {
      this.selectedCartName = cart.name;
    },
    setUserBudget(budget: number) {
      this.budget = budget;
    },
    addToCart(item: CartItem) {
      this.getSelectedCart.items.push(item);
    },
    addCart(cart: Cart) {
      this.carts.push(cart);
    },
    removeCart(cart: Cart) {
      const index = this.carts.indexOf(cart);
      if (index !== -1) {
        this.carts.splice(index, 1);
      }
      this.selectedCartName = this.carts[0].name;
    },
    removeItem(item: CartItem) {
      const index = this.getSelectedCart.items.indexOf(item);
      if (index !== -1) {
        const removedItem = this.getSelectedCart.items.splice(index, 1)[0];
        this.getSelectedCart.deletedItems.push(removedItem);
      }
    },
    undoRemove() {
      if (this.getSelectedCart.deletedItems.length > 0) {
        const lastDeletedItem = this.getSelectedCart.deletedItems.pop();
        if (lastDeletedItem) {
          this.getSelectedCart.items.push(lastDeletedItem);
        }
      }
    },
  },
  persist: true,
});
