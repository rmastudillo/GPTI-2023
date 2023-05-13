import { createRouter, createWebHistory } from "vue-router";
import { testRoute } from "./components/first_page/router";
import { homeRoute } from "./components/home/router";

const baseUrl = "";

export const routes = [
  {
    path: `${baseUrl}/`,
    component: () => import("@/layouts/MainLayout.vue"),
    children: [...homeRoute, ...testRoute],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
