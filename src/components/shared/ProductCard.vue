<script lang="ts" setup>
import { CartItem } from "@/types/common";
import { badgeStyle } from "@/utils/constants";
import formatPrice from "@/utils/formatPrice";

defineProps({
  item: {
    type: Object as () => CartItem,
    required: true,
  },
});

const emit = defineEmits(["addToCart"]);

const addToCart = (item: any) => {
  // Emitir el evento addToCart con el objeto item como argumento
  emit("addToCart", item);
};
</script>

<template>
  <div class="card">
    <img :src="item.url_imagen" class="card-img-top" alt="..." />
    <div class="card-body flex flex-col justify-between">
      <h5 class="card-title m-0">{{ item.nombre }}</h5>
      <span class="font-medium">{{ formatPrice(item.precio) }}</span>
      <p :class="`card-text badge ${badgeStyle[item.supermercado]} w-fit`">
        {{ item.supermercado }}
      </p>
      <div class="btn btn-primary" @click="addToCart(item)">
        Agregar al carrito
      </div>
    </div>
  </div>
</template>
