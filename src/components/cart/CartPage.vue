<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { Cart, CartItem } from "@/types/common";
import formatearPrecio from "@/utils/formatPrice";
import { computed, ref } from "vue";

const userStore = useUserStore();

const newCartName = ref("");

const removeItem = (item: CartItem) => {
  userStore.removeItem(item);
};

const remainingBudget = computed(() => {
  return userStore.budget - userStore.getExpenses;
});

userStore.setUserBudget(100000);
const canAddCart = ref(false);

const addNewCart = () => {
  const newCart = {
    name: newCartName.value,
    items: [],
    budget: 0,
    deletedItems: [],
  } as Cart;
  userStore.addCart(newCart);
  newCartName.value = "";
  canAddCart.value = false;
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <button
      @click="() => (canAddCart = !canAddCart)"
      class="btn btn-primary w-fit"
    >
      Agregar un nuevo carrito
    </button>
    <div
      :hidden="!canAddCart"
      class="flex flex-row justify-start gap-2 align-items-center"
    >
      <span class="inline-block w-fit"> Nombre: </span>
      <div class="w-[20rem] flex flex-row gap-2">
        <input
          class="form-control w-1"
          type="text"
          v-model="newCartName"
          placeholder="Ingresa un nombre"
        />
        <button @click="addNewCart" class="btn btn-primary w-fit">
          Agregar
        </button>
      </div>
    </div>
  </div>
  <div class="inline-flex gap-2">
    <h1>Carrito de compra</h1>

    <div class="flex flex-row gap-1">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-info dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ userStore.selectedCart.name }}
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="cart in userStore.carts"
            class="dropdown-item cursor-pointer"
            @click="userStore.setNewCart(cart)"
          >
            <span class="cursor-pointer" @click="userStore.setNewCart(cart)">
              {{ cart.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <p>
    Presupuesto Total
    <span :class="`budget `">{{ formatearPrecio(userStore.budget) }} </span>
  </p>
  <p>
    Precio total carrito:
    <span class="budget">{{ formatearPrecio(userStore.getExpenses) }}</span>
  </p>
  <p>
    Presupuesto restante:
    <span :class="`budget ${remainingBudget > 0 ? ' ' : 'bg-red-400'}`"
      >{{ formatearPrecio(remainingBudget) }}
    </span>
  </p>
  <button
    v-if="userStore.carts.length > 1"
    @click="
      userStore.removeCart(userStore.selectedCart),
        userStore.setNewCart(userStore.carts[0])
    "
    class="btn btn-danger w-fit"
  >
    Eliminar carrito
  </button>
  <br />
  <div>
    <button
      @click="userStore.undoRemove()"
      type="button"
      class="btn btn-dark my-2"
      :hidden="!userStore.canUndo"
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
      <tbody v-for="item in userStore.selectedCart.items">
        <tr>
          <td>{{ item.nombre }}</td>
          <td>{{ item.precio }}</td>
          <td>
            <button
              @click="removeItem(item)"
              type="button"
              class="btn btn-dark"
            >
              -
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.budget {
  font-weight: bold;
  font-size: 1.2em;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
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
