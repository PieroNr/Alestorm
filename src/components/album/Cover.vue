<script setup lang="ts">
import {Sketch} from "../../fake3d/Sketch.js";
import {onMounted, ref} from "vue";

const container = ref<HTMLElement | null>(null);
const props = defineProps<{ url: string, heightUrl: string }>()

onMounted(() => {
  new Sketch({
    container: container.value,
    horizontalTreshold: 20,
    imageDepth: props.heightUrl,
    imageOriginal: props.url,
    verticalTreshold: 10
  })
})
</script>

<template>
  <div class="cover" ref="container">
  </div>
</template>

<style scoped lang="scss">

</style>
