<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";
import ProductCard from "../shared/ProductCard.vue";

const cartStore = useCartStore();
const userStore = useUserStore();

onMounted(() => {
  cartStore.getProducts();
});
const addToCart = (item: any) => {
  userStore.addToCart(item);
};
</script>
<template>
  <h1>Ejemplo Scrapper Productos Jumbo (Categoria Carne)</h1>
  <br />
  <div>
    <div class="loading-message" v-if="cartStore.loading">
      <div class="spinner-border" role="status"></div>
      <h3 class="mx-2">Loading...</h3>
    </div>
    <div v-else class="flex flex-wrap gap-5">
      <div v-for="(item, index) in cartStore.items.slice(0, 50)" class="flex">
        <ProductCard :item="item" @addToCart="(item:any) => addToCart(item)" />
      </div>
    </div>
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
.card img {
  display: flex;
  height: 15rem;
  object-fit: contain;
}
.card {
  display: flex;
  flex-direction: column;
  width: 18rem;
}
</style>
