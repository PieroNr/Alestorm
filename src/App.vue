<script setup lang="ts">
import {onMounted, ref, onBeforeUnmount, watchEffect  } from 'vue';
import Sea from "./parts/Sea.vue";
import Musics from "./parts/Musics.vue";
import Band from './parts/Band.vue'
import Loading from './components/Loading.vue';
import {gsap} from 'gsap';

const isLoading = ref(true);


onMounted(() => {
  window.scrollTo(0, 0);

  setTimeout(() => {

    gsap.to(".loading-container", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.querySelector(".sea-container").style.display = "block";
      document.querySelector(".loading-container").style.display = "none";
      isLoading.value = false;
    }
  });
  }, 3000);
});

onBeforeUnmount(() => {
  // Clean up the class when the component is unmounted
  removeOverflowHidden();
});

watchEffect(() => {
  if (isLoading.value) {
    addOverflowHidden();
  }
});

function addOverflowHidden() {
  document.body.classList.add('overflow-hidden');
}

function removeOverflowHidden() {
  document.body.classList.remove('overflow-hidden');
}


</script>

<template>
  <img src="/paper.jpg" class="texture">
  <loading class="loading-container"/>
  <div>
    <Sea :isLoading="isLoading" class="sea-container"/>
    <Musics v-if="!isLoading"/>
    <Band v-if="!isLoading" />
  </div>
</template>
<!-- put style type to scss -->
<style lang="scss">
.sea-container{
  display: none;
}
.overflow-hidden {

  overflow: hidden !important;
  pointer-events: none !important;
}

.texture {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 100;
  mix-blend-mode:multiply;
}


</style>
