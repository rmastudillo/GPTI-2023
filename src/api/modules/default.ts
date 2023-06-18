import { client } from "@/api/client";

export const getProducts = () => client.get("/products");

export const getAllCategories = () => client.get("/prueba");
