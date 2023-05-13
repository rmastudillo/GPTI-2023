<template>
  <div class="bg-gray-100 min-h-screen p-10">

    <router-link class="estasotraclase m-3 p-3" :to="{ name: 'test' }">
      test
    </router-link>
  </div>
</template>
<style scoped>
.estasotraclase {
  border: 4px solid rgb(0, 0, 0);
  background-color: white;
  color: rgb(0, 0, 0);
  font-size: 16px;
  cursor: pointer;
}
</style>
