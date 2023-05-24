<script setup lang="ts">
import {onMounted, ref, watch } from 'vue';
import {gsap} from 'gsap';

const boatSrc = ref('/src/assets/img/boat.png');
const lighthouseSrc = ref('/src/assets/svg/lightHouse-off.svg');
const lighthouseOpacity = ref(1);
const isLighthouseOn = ref(false);

const toggleLighthouse = () => {
  const lighthouseNewSrc = lighthouseSrc.value.includes('off') ? '/src/assets/svg/lightHouse-on.svg' : '/src/assets/svg/lightHouse-off.svg';
  const boatNewSrc = lighthouseSrc.value.includes('off') ? '/src/assets/img/plastic-Duck.png' : '/src/assets/img/boat.png';

  setTimeout(() => {
    document.body.classList.add('transition-active');
  }, 1000);

  // Supprimer la classe de transition après la fin de la transition
  setTimeout(() => {
    document.body.classList.remove('transition-active');
  }, 1010);

  isLighthouseOn.value = !isLighthouseOn.value;
  gsap.to(lighthouseOpacity, {
    value: 0,
    duration: 0.02,
    onComplete: () => {
      lighthouseSrc.value = lighthouseNewSrc;
      gsap.to(lighthouseOpacity, { value: 1, duration: 0.08 });
    }
  });

  const stars = document.querySelectorAll('.star');

  if(isLighthouseOn.value){
      stars.forEach((star) => {
        const scale = 0; // Facteur d'échelle aléatoire
        gsap.to(star, {
          scaleX: scale,
          scaleY: scale,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
          delay: Math.random() * 0.5,
        });
      });

      gsap.to(".clouds-container", {
        y: 0,
        duration: 1,
        ease: 'expo.easeIn',
      });
    
  } else {
    stars.forEach((star) => {
        const scale = Math.random() * 0.2 + 2; // Facteur d'échelle aléatoire
        gsap.to(star, {
          scaleX: scale,
          scaleY: scale,
          opacity: 1,
          duration: 0.4,
          ease: 'power1.inOut',
          delay: Math.random() * 0.5,
        });
      });

      gsap.to(".clouds-container", {
        y: "-100%",
        duration: 1,
        ease: 'expo.easeIn',
      });
  }


  gsap.to(".boat", {
    y: "-20%",
    duration: 0.2,
    ease: 'expo.easeIn',
    onComplete: () => {
      gsap.to(".boat", {
        y: "100%",
        opacity: 1,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          boatSrc.value = boatNewSrc;
          gsap.fromTo(".boat", { y: "100%" }, { y: "0%", opacity: 1, duration: 1, ease: 'power1.inOut' });
        }
      });
    }
  });
};

watch(isLighthouseOn, (newValue) => {
  document.documentElement.style.setProperty('--background-color', newValue ? '#74bbff' : '#171921');
  const waves = document.querySelectorAll('.wave');
  waves.forEach((wave) => {
    if (newValue) {
      wave.classList.add('filter-active');
    } else {
      wave.classList.remove('filter-active');
    }
  });
});

const generateClouds = () => {
  const numClouds = 10;
  const minSize = 100;
  const maxSize = 300;

  const container = document.querySelector('.clouds-container');

  for (let i = 1; i <= numClouds; i++){
    const cloud = document.createElement('img');
    cloud.classList.add('cloud');
    cloud.src = '/src/assets/svg/cloud-'+ Math.ceil(i/2) +'.svg';

    const x = Math.random() * window.innerWidth - minSize;
    const y = Math.random() * window.innerHeight - maxSize;

    const size = Math.random() * (maxSize - minSize) + minSize;

    cloud.style.left = `${x}px`;
    cloud.style.top = `${y}px`;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size}px`;
    cloud.style.opacity = `${Math.random() * (1 - 0.5) + 0.5}`;
    cloud.style.position = 'absolute';

    container.appendChild(cloud);
  }
}

const generateStars = () => {
  const numStars = 100; // Nombre d'étoiles à générer
  const minSize = 1; // Taille minimale des étoiles
  const maxSize = 4; // Taille maximale des étoiles

  const container = document.querySelector('.stars-container');

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Position aléatoire
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Taille aléatoire
    const size = Math.random() * (maxSize - minSize) + minSize;

    // Appliquer les styles
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    container.appendChild(star);

    const animateStars = () => {
      const stars = document.querySelectorAll('.star');
      stars.forEach((star) => {
        const scale = Math.random() * 0.2 + 2; // Facteur d'échelle aléatoire

        gsap.to(star, {
          scaleX: scale,
          scaleY: scale,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: Math.random() * 0.5,
        });
      });
    };

    animateStars();
  }
};

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

const parallax = (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  const xPos = (clientX / innerWidth) * 100; // Position horizontale en pourcentage
  const yPos = (clientY / innerHeight) * 100; // Position verticale en pourcentage

  gsap.to(".boat", {
    x: xPos/2, // Ajustez la vitesse de déplacement horizontal du bateau
    y: yPos/2, // Ajustez la vitesse de déplacement vertical du bateau
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.to(".wave-one", {
    x: xPos / 2, // Ajustez la vitesse de déplacement horizontal de la vague 1
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.to(".wave-two", {
    x: xPos / 4, // Ajustez la vitesse de déplacement horizontal de la vague 2
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.to(".wave-three", {
    x: xPos / 6, // Ajustez la vitesse de déplacement horizontal de la vague 3
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.to(".wave-four", {
    x: xPos / 25, // Ajustez la vitesse de déplacement horizontal de la vague 4
    duration: 0.5,
    ease: 'power2.out'
  });
  gsap.to(".lighthouse", {
    y: yPos/5, // Ajustez la vitesse de déplacement horizontal de la vague 4
    x: xPos/5, // Ajustez la vitesse de déplacement horizontal de la vague 4
    duration: 0.5,
    ease: 'power2.out'
  });
};

window.addEventListener('mousemove', parallax);

// Appel de la méthode au montage du composant
onMounted(() => {
  generateStars();
  generateClouds();
  swayBoat();
  animateWaves();
});


</script>

<template>
  <div class="sea">
    <div class="stars-container"></div>
    <div class="clouds-container"></div>
    <img class="logo" src="/alestorm-logo.svg" alt="alestorm logo"/>
    <img class="boat" ref="boat" :src="boatSrc" alt="boat"/>
    <img class="wave wave-one" :class="{ 'filter-active': isLighthouseOn }" src="../assets/img/wave-1.png" alt="wave"/>
    <img class="wave wave-two" :class="{ 'filter-active': isLighthouseOn }" src="../assets/img/wave-2.png" alt="wave"/>
    <img class="wave wave-three" :class="{ 'filter-active': isLighthouseOn }" src="../assets/img/wave-3.png" alt="wave"/>
    <img class="wave wave-four" :class="{ 'filter-active': isLighthouseOn }" src="../assets/img/wave-4.png" alt="wave"/>
    <img class="lighthouse" ref="lighthouse" :src="lighthouseSrc" alt="lighthouse" @click="toggleLighthouse" :style="{ opacity: lighthouseOpacity }"/>
  </div>


</template>

<style lang="scss">
:root {
  --background-color: #171921; /* Couleur de fond par défaut */
}

body {
  background-color: var(--background-color);
  transition: background-color 1s ease;
}

.transition-active {
  transition: none;
}

.filter-active {
  transition: filter 2s ease;
  filter: brightness(2) hue-rotate(80deg) drop-shadow(5px 10px 5px #000000) !important;
}

.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.clouds-container {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
  width: 100%;
  height: 100%;
  z-index: 0;
  
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
}

.logo {
  width: 1200px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: block;
  z-index: 1;
}

.wave {
  -webkit-filter: drop-shadow(5px 5px 5px #000000);
  filter: drop-shadow(10px 10px 20px #000000);
  transition: filter 2s ease;
}

.sea {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100vh;
}

.wave-one {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: 300px;
  z-index: 3;
}

.wave-two {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: -200px;
  z-index: 4;
}

.wave-three {
  width: 100%;
  position: absolute;
  bottom: -80px;
  left: -400px;
  z-index: 5;
}

.wave-four {
  width: 95%;
  position: absolute;
  bottom: -120px;
  left: -50px;
  z-index: 6;
}

.boat {
  width: 700px;
  position: absolute;
  bottom: 70px;
  right: 100px;
  z-index: 4;
  rotate: 10deg;
  -webkit-filter: drop-shadow(5px 5px 5px #000000);
  
}

.lighthouse {
  width: 400px;
  position: absolute;
  bottom: 100px;
  left: -50px;
  z-index: 2;
  -webkit-filter: drop-shadow(5px 5px 5px #000000);
  filter: drop-shadow(2px 2px 10px #000000);
}

</style>
