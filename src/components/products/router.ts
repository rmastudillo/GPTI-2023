export const productsRoute = [
  {
    path: "/products",
    name: "Products",
    component: () => import("@/views/ProductsView.vue"),
    props: true,
  },
];
