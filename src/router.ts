import { testRoute } from "@/components/first_page/router";
import { homeRoute } from "@/components/home/router";
import Main from "@/views/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [...homeRoute, ...testRoute],
    },
  ],
});
