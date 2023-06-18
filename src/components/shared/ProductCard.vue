<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { CartItem } from "@/types/common";
import formatPrice from "@/utils/formatPrice";

interface BadgeStyle {
  [key: string]: string;
}

defineProps({
  item: {
    type: Object as () => CartItem,
    required: true,
  },
});

const emit = defineEmits(["addToCart"]);

const badgeStyle = {
  jumbo: "bg-lime-500",
  lider: "bg-blue-500",
  "santa isabel": "bg-red-500",
} as BadgeStyle;

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
