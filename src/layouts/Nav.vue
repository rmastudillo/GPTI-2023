<script lang="ts" setup>
import { routes } from "@/router";
import { useUserStore } from "@/stores/userStore";
import { QueryParams } from "@/types/common";
import { categorias, superMarket } from "@/utils/constants";
import { ref } from "vue";
import { RouteLocationNormalized, useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const searchValue = ref(route.query.search ?? "");
const selectedCategory = ref(route.query.categoria ?? "");
const selectedSubcategory = ref(route.query.subcategoria ?? "");
const selectedSupermarket = ref(route.query.supermercado ?? "");

const handleSubmit = (e: any) => {
  e.preventDefault();
  const query: QueryParams = { search: searchValue.value.toString() };
  if (selectedCategory.value)
    query.categoria = selectedCategory.value.toString();
  if (selectedSubcategory.value)
    query.subcategoria = selectedSubcategory.value.toString();
  if (selectedSupermarket.value)
    query.supermercado = selectedSupermarket.value.toString();

  const locationQuery: RouteLocationNormalized["query"] = {};

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      locationQuery[key] = value;
    }
  }
  router.replace({ name: "Products", query: locationQuery });
};

const clearFilters = () => {
  searchValue.value = "";
  selectedCategory.value = "";
  selectedSubcategory.value = "";
  selectedSupermarket.value = "";
  handleSubmit(new Event("submit"));
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  selectedSubcategory.value = "";
  handleSubmit(new Event("submit"));
};

const selectSubcategory = (subcategory: string) => {
  selectedSubcategory.value = subcategory;
  handleSubmit(new Event("submit"));
};

const selectSupermarket = (superMarket: string) => {
  selectedSupermarket.value = superMarket;
  handleSubmit(new Event("submit"));
};
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg mb-4 border-bottom">
      <div>
        <router-link
          :to="routes[0].path"
          class="navbar-brand d-flex align-items-center text-decoration-none w-fit-content"
        >
          <img
            class="image"
            src="https://www.sernac.cl/portal/604/channels-503_imagen_fb.thumb_i_normal.jpg"
          />
          <div class="w-[12rem]">
            <strong>Scrapper</strong>
          </div>
        </router-link>
      </div>

      <div
        class="container-fluid flex flex-col align-self-end justify-start align-items-start"
      >
        <form @submit="handleSubmit" class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchValue"
            placeholder="Buscar"
            aria-label="Search"
          />
          <button class="btn btn-outline-primary mr-2" type="submit">
            Buscar
          </button>
          <button
            class="btn btn-outline-secondary inline-flex align-items-center w-[15rem]"
            type="button"
            @click="clearFilters"
          >
            Limpiar filtros
          </button>
        </form>
        <div class="flex flex-nowrap flex-row gap-2 mt-3">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </button>

            <div
              class="dropdown-menu w-max"
              aria-labelledby="dropdownMenuButton1"
            >
              <div class="container">
                <div class="row my-4">
                  <div
                    v-for="(subcategorias, categoria) in categorias"
                    class="col-md-6 col-lg-3 mb-3 mb-lg-0"
                  >
                    <div class="list-group list-group-flush">
                      <p
                        class="mb-0 list-group-item text-uppercase font-weight-bold"
                        @click="
                          (e) => {
                            selectedCategory = categoria.toString();
                            selectedSubcategory = '';
                            handleSubmit(e);
                          }
                        "
                      >
                        {{ categoria }}
                      </p>

                      <a
                        v-for="subcategoria in subcategorias"
                        :key="subcategoria"
                        href=""
                        class="list-group-item list-group-item-action"
                        @click="
                          (e) => {
                            selectedCategory = categoria.toString();
                            selectedSubcategory = subcategoria;
                            handleSubmit(e);
                          }
                        "
                      >
                        {{ subcategoria }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownCategory"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedCategory ? selectedCategory : "Categorías" }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownCategory">
              <li v-for="categoria in Object.keys(categorias)" :key="categoria">
                <a class="dropdown-item" @click="selectCategory(categoria)">
                  {{ categoria }}
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown" v-if="selectedCategory">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownSubcategory"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedSubcategory ? selectedSubcategory : "Subcategorías" }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownSubcategory">
              <li
                v-for="subcategoria in categorias[selectedCategory.toString()]"
                :key="subcategoria"
              >
                <a
                  class="dropdown-item"
                  @click="selectSubcategory(subcategoria)"
                >
                  {{ subcategoria }}
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownSubcategory"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedSupermarket ? selectedSupermarket : "Supermercado" }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownSubcategory">
              <li v-for="supermarket in superMarket" :key="supermarket">
                <a
                  class="dropdown-item"
                  @click="selectSupermarket(supermarket)"
                >
                  {{ supermarket }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="btn-group h-fit">
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
        <router-link :to="{ name: 'Cart' }">
          <div class="h-0">
            <span
              class="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ userStore.getItemCount }}
            </span>
          </div>
          <button type="button" class="btn btn-dark h-fit">
            <i class="bi bi-cart"></i>
          </button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.image {
  width: 7rem;
  object-fit: contain;
  border-radius: 50%;
}
</style>
