<script lang="ts" setup>
import { routes } from "@/router";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const searchValue = ref(route.query.search ?? "");
const handleSubmit = (e: Event) => {
  e.preventDefault();
  const query = { search: searchValue.value };
  router.replace({ name: "Products", query });
};

const categorias = [
  [
    "despensa",
    [
      "arroz-y-legumbres",
      "pastas-y-salsas",
      "coctel",
      "conservas",
      "aderezos-y-salsas",
      "reposteria",
      "harina-y-complementos",
      "aceites-sal-y-condimentos",
      "instantaneos-y-sopas",
      "comidas-etnicas",
    ],
  ],
  [
    "lacteos",
    [
      "leches",
      "yoghurt",
      "postres",
      "mantequillas-y-margarinas",
      "huevos",
      "leches-cultivadas-y-bebidas-lacteas",
      "probioticos-y-defensas",
    ],
  ],
  ["frutas-y-verduras", ["frutas", "verduras", "frutos-secos-y-semillas"]],
  ["carniceria", ["vacuno", "cerdo", "pollo", "pavo", "cordero"]],
  [
    "botilleria",
    [
      "bebidas-gaseosas",
      "aguas-minerales",
      "jugos",
      "bebidas-energeticas",
      "bebidas-isotonicas",
    ],
  ],
  [
    "limpieza",
    [
      "papeles-hogar",
      "limpieza-de-ropa",
      "bano-y-cocina",
      "pisos-y-muebles",
      "aerosoles-y-desinfectantes",
      "accesorios-de-limpieza",
    ],
  ],
  ["mascotas", ["perros", "gatos", "otras-mascotas"]],
  [
    "supermercado",
    [
      "bebe",
      "congelados",
      "desayuno-y-dulces",
      "belleza-y-cuidado-personal",
      "vinos-cervezas-y-licores",
      "quesos-y-fiambres",
      "panaderia-y-pasteleria",
      "pescaderia",
      "comidas-preparadas",
      "sabores-del-mundo",
      "mundo-bio-natura",
      "hogar",
      "electro-y-tecno",
      "deportes",
      "jugueteria",
      "escolares-y-libreria",
      "farmacia",
      "automovil-ferreteria-y-jardin",
    ],
  ],
];
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

        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorias
          </button>

          <div
            class="dropdown-menu w-max"
            aria-labelledby="dropdownMenuButton1"
          >
            <div class="container">
              <div class="row my-4">
                <div
                  v-for="categoria in categorias"
                  class="col-md-6 col-lg-3 mb-3 mb-lg-0"
                >
                  <div class="list-group list-group-flush">
                    <p
                      class="mb-0 list-group-item text-uppercase font-weight-bold"
                    >
                      {{ categoria[0] }}
                    </p>

                    <a
                      v-for="subcategoria in categoria[1]"
                      href=""
                      class="list-group-item list-group-item-action"
                      >{{ subcategoria }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <form @submit="handleSubmit" class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchValue"
            placeholder="Search"
            aria-label="Search"
          />
          <router-link
            :to="{ name: 'Products', query: { search: searchValue } }"
            class="btn btn-outline-primary"
            type="submit"
            replace
          >
            Search
          </router-link>
        </form>
      </div>
      <router-link :to="{ name: 'Cart' }">
        <button type="button" class="btn btn-dark">
          <span
            class="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ userStore.getItemCount }}
          </span>
          <i class="bi bi-cart"></i>
        </button>
      </router-link>
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
