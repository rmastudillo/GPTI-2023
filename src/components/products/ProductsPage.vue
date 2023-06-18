<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ProductCard from "../shared/ProductCard.vue";

const route = useRoute();
const cartStore = useCartStore();
const userStore = useUserStore();

watch(
  () => route.query,
  (newId, oldId) => {
    cartStore.getFilteredItems(route.query);
  }
);

onMounted(() => {
  cartStore.getFilteredItems(route.query);
});

const addToCart = (item: any) => {
  userStore.addToCart(item);
};

const paramsToString = (params: any) => {
  return Object.keys(params)
    .map((key) => `${params[key]}`)
    .join("/");
};
</script>

<template>
  <h1>
    {{
      Object.keys(route.query).length
        ? `Productos Filtrados ` + paramsToString(route.query)
        : "Todos los Productos"
    }}
  </h1>
  <br />
  <div>
    <div class="loading-message" v-if="cartStore.loading">
      <div class="spinner-border" role="status"></div>
      <h3 class="mx-2">Loading...</h3>
    </div>
    <div v-else class="flex flex-wrap gap-5">
      <div
        v-for="(item, index) in cartStore.filteredItems.slice(0, 50)"
        class="flex"
      >
        <ProductCard :item="item" @addToCart="(item:any) => addToCart(item)" />
      </div>
    </div>
  </div>
</template>
