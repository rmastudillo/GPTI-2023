<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { Cart, CartItem } from "@/types/common";
import { badgeStyle } from "@/utils/constants";
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

const primerCarrito = ref(userStore.carts[0]);
const segundoCarrito = ref(
  userStore.carts.length > 1 ? userStore.carts[1] : userStore.carts[0]
);
const getPrimerCarritoExpenses = computed(() => {
  let expenses = 0;
  primerCarrito.value.items.map((item) => {
    expenses += item.precio;
  });
  return expenses;
});
const getSegundoCarritoExpenses = computed(() => {
  let expenses = 0;
  segundoCarrito.value.items.map((item) => {
    expenses += item.precio;
  });
  return expenses;
});

const handleRemove = () => {
  const selectedCartName = userStore.getSelectedCart.name;
  userStore.removeCart(userStore.getSelectedCart);
  userStore.setNewCart(userStore.carts[0]);
  if (primerCarrito.value.name === selectedCartName) {
    primerCarrito.value = userStore.carts[0];
  }
  if (segundoCarrito.value.name === selectedCartName) {
    segundoCarrito.value = userStore.carts[0];
  }
};
</script>
<template>
  <section class="flex flex-col gap-2">
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
    <div class="inline-flex gap-2 align-items-center">
      <h1>Carrito de compra</h1>

      <div class="flex flex-row gap-1">
        <div class="w-fit">
          <button
            type="button"
            class="btn btn-info dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ userStore.getSelectedCart?.name }}
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
    <div class="flex flex-row flex-nowrap gap-2 align-items-center">
      Presupuesto Total: $
      <div class="w-[10rem]">
        <input
          type="number"
          :min="0"
          class="form-control"
          v-model="userStore.budget"
        />
      </div>
    </div>
    <div>
      Precio total carrito:

      <span class="budget">{{ formatearPrecio(userStore.getExpenses) }}</span>
    </div>
    <div>
      Presupuesto restante:
      <span :class="`budget ${remainingBudget > 0 ? ' ' : 'bg-red-400'}`"
        >{{ formatearPrecio(remainingBudget) }}
      </span>
    </div>
  </section>
  <section>
    <div
      :class="`flex flex-row w-full  ${
        !userStore.canUndo ? 'justify-end' : 'justify-between'
      }`"
    >
      <button
        @click="userStore.undoRemove()"
        type="button"
        class="btn btn-dark"
        :hidden="!userStore.canUndo"
      >
        Deshacer
      </button>
      <button
        v-if="userStore.carts.length > 1"
        @click="handleRemove"
        class="btn btn-danger w-fit"
      >
        Eliminar carrito
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Supermercado</th>
          <th scope="col">Precio</th>
          <th scope="col">Remover</th>
        </tr>
      </thead>
      <tbody v-for="item in userStore.getSelectedCart.items">
        <tr>
          <td>{{ item.nombre }}</td>
          <td>
            <span :class="`badge ${badgeStyle[item.supermercado]}`">
              {{ item.supermercado }}
            </span>
          </td>
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
  </section>
  <hr />
  <section>
    <h2>Comparación:</h2>
    <div class="flex flex-row flex-nowrap gap-4">
      <div class="flex flex-col gap-1 w-1/2">
        <div class="w-fit">
          <button
            type="button"
            class="btn btn-info dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ primerCarrito.name }}
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="cart in userStore.carts"
              class="dropdown-item cursor-pointer"
              @click="() => (primerCarrito = cart)"
            >
              <span
                class="cursor-pointer"
                @click="() => (primerCarrito = cart)"
              >
                {{ cart.name }}
              </span>
            </li>
          </ul>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Supermercado</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userStore.getCart(primerCarrito.name).items">
              <td>{{ item.nombre }}</td>
              <td>
                <span :class="`badge ${badgeStyle[item.supermercado]}`">
                  {{ item.supermercado }}
                </span>
              </td>
              <td>{{ item.precio }}</td>
            </tr>
            <tr>
              <td class="font-bold">Total:</td>
              <td></td>
              <td class="font-bold">{{ getPrimerCarritoExpenses }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col gap-1 w-1/2">
        <div class="w-fit">
          <button
            type="button"
            class="btn btn-info dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ segundoCarrito.name }}
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="cart in userStore.carts"
              class="dropdown-item cursor-pointer"
              @click="() => (segundoCarrito = cart)"
            >
              <span
                class="cursor-pointer"
                @click="() => (segundoCarrito = cart)"
              >
                {{ cart.name }}
              </span>
            </li>
          </ul>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Supermercado</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userStore.getCart(segundoCarrito.name).items">
              <td>{{ item.nombre }}</td>
              <td>
                <span :class="`badge ${badgeStyle[item.supermercado]}`">
                  {{ item.supermercado }}
                </span>
              </td>
              <td>{{ item.precio }}</td>
            </tr>
            <tr>
              <td class="font-bold">Total:</td>
              <td class="b-0"></td>
              <td class="font-bold">{{ getSegundoCarritoExpenses }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h5 v-if="getPrimerCarritoExpenses != getSegundoCarritoExpenses">
      Tu carrito "{{
        getPrimerCarritoExpenses - getSegundoCarritoExpenses > 0
          ? `${primerCarrito.name}`
          : `${segundoCarrito.name}`
      }}" es
      {{
        getPrimerCarritoExpenses - getSegundoCarritoExpenses > 0
          ? `${formatearPrecio(
              getPrimerCarritoExpenses - getSegundoCarritoExpenses
            )}`
          : `${formatearPrecio(
              getSegundoCarritoExpenses - getPrimerCarritoExpenses
            )}`
      }}
      más barato que "{{
        getPrimerCarritoExpenses - getSegundoCarritoExpenses > 0
          ? `${segundoCarrito.name}`
          : `${primerCarrito.name}`
      }}"
    </h5>
    <h5 v-else>
      Ambos carritos tienen el mismo precio:
      {{ formatearPrecio(getPrimerCarritoExpenses) }}
    </h5>
  </section>
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
  background-color: rgb(118, 118, 232);
  color: white;
}
</style>
