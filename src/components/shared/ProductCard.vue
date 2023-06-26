<script lang="ts" setup>
import { CartItem } from "@/types/common";
import { badgeStyle } from "@/utils/constants";
import formatPrice from "@/utils/formatPrice";
import { ref } from "vue";

defineProps({
  item: {
    type: Object as () => CartItem,
    required: true,
  },
});

const isAnimating = ref(false);
const emit = defineEmits(["addToCart"]);

const addToCart = (item: any) => {
  isAnimating.value = true;
  // Emitir el evento addToCart con el objeto item como argumento
  emit("addToCart", item);
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
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
      <div
        :class="{ 'btn-animating': isAnimating }"
        class="btn btn-primary"
        @click="addToCart(item)"
      >
        Agregar al carrito
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-animating {
  animation: buttonAnimation 0.3s;
}

@keyframes buttonAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
