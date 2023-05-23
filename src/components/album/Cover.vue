<script setup lang="ts">
defineProps<{url:string}>()
</script>

<template>
  <div class="cover">
    <img :src="url" alt="" class="cover__image"/>
  </div>
</template>

<style scoped lang="scss">

</style>
