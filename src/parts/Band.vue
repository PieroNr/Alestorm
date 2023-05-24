<script setup lang="ts">
import Path from "../components/album/Path.vue";
</script>

<template>
  <Path svg-height="500"/>

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
  width: 100vw;
  height: 100vh;
  position: relative;

  > * {
    position: absolute;
  }

  .title {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    color: white;
    text-shadow: 0 0 10px black;
  }

  .img-1 {
    top: 0;
    left: 0;
    width: 50%;
  }

  .img-2 {
    top: 0;
    right: 0;
    width: 50%;
  }

  .img-3 {
    bottom: 0;
    right: 0;
    width: 50%;
  }

  .img-4 {
    bottom: 0;
    left: 0;
    width: 50%;
  }
  .img-5 {
    bottom: 0;
    left: 50%;
    width: 50%;
  }
}
</style>
