<script setup lang="ts">
import {onMounted} from 'vue';
import {gsap} from 'gsap';

// ...

const swayBoat = () => {
  gsap.to(".boat", {
    rotation: "-5deg",
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  });
};

const animateWaves = () => {
  const waveOne = ".wave-one";
  const waveTwo = ".wave-two";
  const waveThree = ".wave-three";
  const waveFour = ".wave-four";


  gsap.to(waveOne, {
    y: 20,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  gsap.to(waveTwo, {
    y: -10,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 0.3
  });

  gsap.to(waveThree, {
    y: -30,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 0.6
  });

  gsap.to(waveFour, {
    y: -30,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 0.9
  });
};

// Appel de la méthode au montage du composant
onMounted(() => {
  swayBoat();
  animateWaves();
});


</script>

<template>
  <div class="sea">
    <img class="logo" src="/alestorm-logo.svg" alt="alestorm logo"/>

    <img class="boat" ref="boat" src="../assets/img/boat.png" alt="boat"/>
    <img class="wave-one" src="../assets/img/wave-1.png" alt="wave"/>
    <img class="wave-two" src="../assets/img/wave-2.png" alt="wave"/>
    <img class="wave-three" src="../assets/img/wave-3.png" alt="wave"/>
    <img class="wave-four" src="../assets/img/wave-4.png" alt="wave"/>
  </div>


</template>

<style lang="scss">
.logo {
  width: 1200px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: block;
}

.sea {
  width: 100%;
  overflow: hidden;
  background: #0d0d0d;
  position: relative;
  height: 100vh;
}

.wave-one {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: 300px;
  z-index: 1;
}

.wave-two {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: -200px;
  z-index: 2;
}

.wave-three {
  width: 100%;
  position: absolute;
  bottom: -80px;
  left: -400px;
  z-index: 4;
}

.wave-four {
  width: 95%;
  position: absolute;
  bottom: -120px;
  left: -50px;
  z-index: 5;
}

.boat {
  width: 900px;
  position: absolute;
  bottom: 70px;
  right: 100px;
  z-index: 3;
  rotate: 10deg;
}

</style>
