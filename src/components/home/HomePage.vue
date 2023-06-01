<script lang="ts" setup>
import { getProducts } from "@/api/modules/default";
import { useCartStore } from "@/stores/cartStore";
import { onMounted, ref } from "vue";

const products = ref([]);
const loading = ref(true);
const cartStore = useCartStore();

const getProduct = async () => {
  const response = await getProducts();
  products.value = response.data;
  loading.value = false;
};

onMounted(() => {
  getProduct();
});

const addItem = (price: string, name: string) => {
  cartStore.addItem({ price, name });
};
</script>
<template>
  <h1>Ejemplo Scrapper Productos Jumbo (Categoria Carne)</h1>
  <br />
  <div>
    <div class="loading-message" v-if="loading">
      <div class="spinner-border" role="status"></div>
      <h3 class="mx-2">Loading...</h3>
    </div>
    <table v-else class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      </thead>
      <tbody v-for="(price, name) in products ?? {}">
        <tr>
          <td>{{ name }}</td>
          <td>{{ price }}</td>
          <td>
            <button
              @click="addItem(price, name.toString())"
              type="button"
              class="btn btn-dark"
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.estasotraclase {
  border: 4px solid rgb(0, 0, 0);
  background-color: white;
  color: rgb(0, 0, 0);
  font-size: 16px;
  cursor: pointer;
}
.loading-message {
  animation: fade 1s infinite alternate;
  display: flex;
}

@keyframes fade {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
