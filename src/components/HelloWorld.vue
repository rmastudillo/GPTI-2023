<script lang="ts" setup>
const props = defineProps({
  msg: String,
});
</script>
<template>
  <div class="hello">
    <h1>{{ props.msg }}</h1>
  </div>
</template>
