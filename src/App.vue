<script setup lang="ts">
import {onMounted, ref, defineProps, onBeforeUnmount, watchEffect  } from 'vue';
import Sea from "./parts/Sea.vue";
import Musics from "./parts/Musics.vue";
import Loading from './components/Loading.vue';
import {gsap} from 'gsap';

const isLoading = ref(true);


onMounted(() => {
  setTimeout(() => {
    
    gsap.to(".loading-container", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
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
  <loading class="loading-container"/>
  <div>
    <Sea :isLoading="isLoading"/>
    <Musics/>
  </div>
</template>
<!-- put style type to scss -->
<style lang="scss" scope>
.overflow-hidden {
  
  overflow: hidden !important;
  pointer-events: none !important;
}
</style>
