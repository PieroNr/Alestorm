<script setup lang="ts">
import Map from "../components/album/Map.vue";
import {onMounted} from "vue";
import {gsap} from "gsap";

onMounted(() => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.archipel',
      start: 'top 10%',
      end: '+=500',
      scrub: 0.1,
      pin:true,
      snap:0.1
    }
  })
  timeline.from('.img-1', {
   x: '-80vh',
    duration: 1,
    ease: "power2.easeOut"
  })
  timeline.from('.img-2', {
    x: '80vh',
    duration: 1,
    ease: "power2.easeOut"
  })
  timeline.from('.img-3', {
    x: '80vh',
    duration: 1,
    ease: "power2.easeOut"
  })
  timeline.from('.img-4', {
    x: '-80vh',
    duration: 1,
    ease: "power2.easeOut"
  })
  timeline.from('.img-5', {
    y: '80vh',
    duration: 1,
    ease: "power2.easeOut"
  })
})

</script>

<template>
  <Map />

  <div class="archipel">
    <img class="img-1" src="../assets/img/alestorm1.png"/>
    <img class="img-2" src="../assets/img/alestorm2.png"/>
    <img class="img-3" src="../assets/img/alestorm3.png"/>
    <img class="img-4" src="../assets/img/alestorm4.png"/>
    <img class="img-5" src="../assets/img/alestorm5.png"/>
    <h2 class="title">Our band</h2>
  </div>
</template>

<style scoped lang="scss">
.archipel {
  width: 100%;
  height: 100vh;
  overflow:hidden ;
  position: relative;

  --image-size: 50vh;

  > * {
    position: absolute;
  }

  .title {
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    color: white;
    text-shadow: 0 0 10px black;
  }

  .img-1 {
    top: 15px;
    left: 40px;
    height: var(--image-size);
  }

  .img-2 {
    top: 80px;
    right: 30px;
    height: var(--image-size);
  }

  .img-3 {
    bottom: 0;
    right: 0;
    height: var(--image-size);
  }

  .img-4 {
    bottom: 88px;
    left: 45px;
    height: var(--image-size);
  }
  .img-5 {
    bottom: 27px;
    left: 39%;
    height: var(--image-size);
  }
}
</style>
