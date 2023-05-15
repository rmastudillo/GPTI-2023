<script lang="ts" setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { routes } from "@/router";

  const siteUrl = import.meta.env.VITE_BUILD_ADDRESS;
  const router = useRouter();
  const activeRoute = computed(() => router.currentRoute.value.path);
  const isActive = (path: string) => path === activeRoute.value;
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg mb-4 border-bottom">
      <router-link :to="routes[0].path" class="navbar-brand d-flex align-items-center text-decoration-none">
        <img class="image" src="https://www.sernac.cl/portal/604/channels-503_imagen_fb.thumb_i_normal.jpg"/>
        <strong>Scrapper Jumbo</strong>  
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.image{
  width: 10%;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 10px;
}
</style>