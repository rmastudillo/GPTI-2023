<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { CartItem } from "@/types/common";

const userStore = useUserStore();

const removeItem = (item: CartItem) => {
  userStore.removeItem(item);
};
</script>
<template>
  <h1>Carrito de copra</h1>
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
      <tbody v-for="item in userStore.selectedItems ?? {}">
        <tr>
          <td>{{ item.nombre }}</td>
          <td>{{ item.precio }}</td>
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
