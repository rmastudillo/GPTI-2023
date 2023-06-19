<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { CartItem, Cart } from "@/types/common";

const userStore = useUserStore();
const cartStore = useCartStore();

const removeItem = (item: CartItem, cart: Cart) => {
  userStore.removeItem( { cartId: cart.cartId, item } );
};

</script>

<template>
  <h1>Carrito de compra</h1>
  <br />
  <div>
    <button
      @click="userStore.undoRemove()"
      type="button"
      class="btn btn-dark"
      :disabled="!userStore.canUndo"
    >
      Deshacer
    </button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Remover</th>
        </tr>
      </thead>

      <tbody v-for="(cart, cartId) in userStore.carts" :key="cartId">
        <tr v-for="item in cart.selectedItems" :key="item.nombre">
          <td>{{ item.nombre }}</td>
          <td>{{ item.precio }}</td>
          <td>
            <button
              @click="removeItem(item, cart)"
              type="button"
              class="btn btn-dark"
            >
              -
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
