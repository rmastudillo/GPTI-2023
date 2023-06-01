<script lang="ts" setup>
import { CartItem, useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const removeItem = (item: CartItem) => {
  cartStore.removeItem(item);
};
</script>
<template>
  <h1>Carrito de copra</h1>
  <br />
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Remover</th>
        </tr>
      </thead>
      <tbody v-for="item in cartStore.getItems ?? {}">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button
              @click="removeItem(item)"
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
