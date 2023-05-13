<script lang="ts" setup>
import { useTestStore } from "@/stores/testStore";
import { ref } from "vue";

const testStore = useTestStore();
const modifica = () => {
  console.log(1);
  testStore.setTest("Modifiqué el teststore usando el método Test");
  console.log(testStore.getTest);
};
const variableee = ref("");
</script>
<template>
  Acá estoy mostrando el valor de la variable test dentro de testStore con el método getTest:
  <br>
  {{ testStore.getTest }}
  <br>
  Acá estoy mostrando el valor de la variable test dentro de testStore directamente:
  <br>
  {{ testStore.test }}
  <br>
  <br>
  <input class="estaesunaclase m-20" type="text" v-model="testStore.test" />
  <br>
  Esta es una variable ref definida en el archivo:
  <br>
  {{ variableee }}
  <h1>Página de Vue3</h1>
  <br>
  <input class="estaesunaclase" type="text" v-model="variableee" />
  <br>
  <button class="estaesunaclase" :onclick="modifica">Click</button>
  <router-link class="estaesunaclase" :to="{ name: 'home' }"> home </router-link>
</template>
<style scoped>
.estaesunaclase {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
}
</style>
