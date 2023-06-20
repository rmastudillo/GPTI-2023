<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import ProductCard from "../shared/ProductCard.vue";

const cartStore = useCartStore();
const userStore = useUserStore();

onMounted(() => {
  cartStore.getProducts();
});

const budget = ref(userStore.budget);

const addToCart = (item: any) => {
  userStore.addToCart(item);
};
</script>
<template>
  <h1>Productos</h1>
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
.budget-container {
  margin: 20px 0;
}

.budget-input {
  margin-left: 10px;
  padding: 5px;
  font-size: 1em;
}

.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.card img {
  max-width: 100%;
  height: auto;
}
</style>
