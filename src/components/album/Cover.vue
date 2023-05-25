<script setup lang="ts">
//@ts-ignore
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
  <div class="cocover" ref="container" >
  </div>
</template>

<style scoped lang="scss">
.cocover {
  width: 100%;
  aspect-ratio: 1/1;
}
</style>
