<script setup lang="ts">
import Sea from "./components/Sea.vue";
</script>

<template>
  <div>
      <img class="logo" src="/alestorm-logo.svg" alt="alestorm logo" />
      <Sea />
    
  </div>
</template>
<!-- put style type to scss -->
<style lang="scss">
.logo{

  width: 1200px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: block;
}

body{
  background: #171921;
  overflow: hidden;
}
</style>
