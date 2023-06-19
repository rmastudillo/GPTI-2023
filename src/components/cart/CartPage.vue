<template>
  <div>
    <h1>Carrito de compra</h1>
    <p>Presupuesto restante: <span class="budget">${{ remainingBudget.toFixed(2) }}</span></p>
    <br />
    <div>
      <button
        @click="userStore.undoRemove()"
        type="button"
        class="btn btn-dark my-2"
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
        <tbody v-for="item in userStore.selectedItems">
          <tr>
            <td>{{ item.nombre }}</td>
            <td>{{ item.precio }}</td>
            <td>
              <button @click="removeItem(item)" type="button" class="btn btn-dark">
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import { CartItem } from "@/types/common";

const userStore = useUserStore();

const removeItem = (item: CartItem) => {
  userStore.removeItem(item);
};

const remainingBudget = computed(() => {
  return userStore.budget - userStore.selectedItems.reduce((total, item) => total + item.precio, 0);
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.budget {
  color: blue;
  font-weight: bold;
  font-size: 1.2em;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: blue;
  color: white;
}
</style>


