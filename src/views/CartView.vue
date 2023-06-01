<script setup lang="ts">
import CartPage from "@/components/cart/CartPage.vue";
</script>

<template>
  <router-view :key="$route.path">
    <CartPage />
  </router-view>
</template>
