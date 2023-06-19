import { CartItem } from "@/types/common";
import { defineStore } from "pinia";

interface Cart {
  cartId: string;
  selectedItems: CartItem[];
}

interface State {
  carts: Cart[];
  deletedItems: CartItem[];
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): State => ({
    carts: [],
    deletedItems: [],
  }),
  getters: {
    getCartItemCount(state: State): (cartId: string) => number {
      return (cartId: string) => {
        const cart = state.carts.find((cart) => cart.cartId === cartId);
        return cart ? cart.selectedItems.length : 0;
      };
    },
    canUndo(state: State): boolean {
      return state.deletedItems.length > 0;
    },
  },
  actions: {
    addToCart(payload: { cartId: string; item: CartItem }) {
      const { cartId, item } = payload;
      this.deletedItems = [];
      const cart = this.getOrCreateCart(cartId);
      cart.selectedItems.push(item);
    },
    removeItem(payload: { cartId: string; item: CartItem }) {
      const { cartId, item } = payload;
      const cart = this.getCart(cartId);
      if (cart) {
        const index = cart.selectedItems.indexOf(item);
        if (index !== -1) {
          const removedItem = cart.selectedItems.splice(index, 1)[0];
          this.deletedItems.push(removedItem);
        }
      }
    },
    undoRemove() {
      const cartWithLastDeletedItem = this.carts.find(
        (cart) => cart.selectedItems.length > 0
      );
      if (cartWithLastDeletedItem) {
        const lastDeletedItem = cartWithLastDeletedItem.selectedItems.pop();
        if (lastDeletedItem) {
          this.deletedItems.push(lastDeletedItem);
        }
      }
    },
    getOrCreateCart(cartId: string): Cart {
      let cart = this.carts.find((cart) => cart.cartId === cartId);
      if (!cart) {
        cart = {
          cartId,
          selectedItems: [],
        };
        this.carts.push(cart);
      }
      return cart;
    },
    getCart(cartId: string): Cart | undefined {
      return this.carts.find((cart) => cart.cartId === cartId);
    },
  },
  persist: true,
});
