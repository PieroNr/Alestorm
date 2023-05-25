<script setup lang="ts">
import Path from "./Path.vue";
import anchor from './icons/anchor.vue'
import boat1 from './icons/boat_1.vue'
import boat2 from './icons/boat_2.vue'
import boussole from './icons/boussole.vue'
import island2 from './icons/island2.vue'
import island from './icons/island.vue'
import sun from './icons/sun.vue'
//@ts-ignore
import {random} from '@georgedoescode/generative-utils'
import {onBeforeMount, onMounted, ref, shallowRef} from "vue";
import {gsap} from "gsap";

const movement = 30;

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const elements = shuffle([
  anchor,
  boat1,
  boat2,
  boussole,
  island2,
  island,
  sun
]).slice(0, 5)

const positions = [
  'top-left',
  'top-right',
  'center-right',
  'center-left',
  'bottom-left',
  'bottom-right'
]
const remainingPositions = shuffle([...positions])

function getPosition() : string {
  return remainingPositions.pop()
}


const randomPosElements = shallowRef<{
  x: number,
  y: number,
  size: number,
  position: string,
  el: HTMLElement
}[]>([])

const mapElements = ref<HTMLElement[]>([])
const mapElementAnimations = ref([])

onBeforeMount(() => {
  randomPosElements.value = elements.map((el) => {
    return {
      x: random(-50, 50),
      y: random(-50, 50),
      size: random(100, 200),
      position: getPosition(),
      el
    }
  })
})

onMounted(() => {
  mapElements.value.forEach((e) => {
    const animation = gsap.to(e, {
      y: `${random(-25, 25)}%`,
      x: `${random(-25, 25)}%`,
      duration: random(2, 3),
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.3
    })
    mapElementAnimations.value.push(animation)
  })

})

function onMouseEnterElement(index: number, event: MouseEvent) {
  if (!event.target) return
  const container = event.target.closest('.element')
  const waveAnimation = mapElementAnimations.value[index]
  if(!waveAnimation) return
  waveAnimation.pause()
  gsap.to(container.querySelector('svg'), {
    scale: 1.2,
    duration: 0.3,
    ease: 'power1.inOut',

  })
}

function onMouseOver(index: number, event: MouseEvent) {
  const {target} = event
  if (!target) return
  const container = event.target.closest('.element')
  const {left, top, width, height} = target.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top


  gsap.to(container.querySelector("svg"), {
    x: `${(x - width / 2) / width * movement}px`,
    y: `${(y - height / 2) / height * movement}px`,
    duration: 0.2,
    ease: 'power1.out'
  })
}

function onMouseLeave(index: number, event: MouseEvent) {
  if (!event.target) return
  const container = event.target.closest('.element')
  gsap.to(container.querySelector("svg"), {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.3,
    ease: 'elastic.easeOut',
    onComplete: () => {
      const waveAnimation = mapElementAnimations.value[index]
      if(!waveAnimation) return
      waveAnimation.play()
    }
  })
}

</script>

<template>
  <div class="map">
    <Path class="path" :svg-height="800"/>

    <div class="elements">

      <div v-for="(element,i) in randomPosElements"
           @mouseenter="(e) => onMouseEnterElement(i, e)"
           @mouseleave="(e) => onMouseLeave(i, e)"
           @mouseover="(e) => onMouseOver(i, e)"
           ref="mapElements"
           :key="i" class="element" :style="{
            transform :`translate(${element.x}%, ${element.y}%)`,
            maxHeight: `${element.size}px`,
            gridArea: element.position
          }">
        <component :is="element.el"/>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.map {
  display: grid;
  height: 800px;

  overflow: hidden;

  .elements, .path {
    grid-area: 1/1;
  }

  .path {
    z-index: 1;
    pointer-events: none;
  }

  .elements {
    height: 70%;
    width: 80%;
    margin: 0 auto;
    align-self: center;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns:   1fr  1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 'top-left . top-right'
                         'center-left . center-right'
                         'bottom-left . bottom-right';
    gap: 10%;

    .element {
      max-height: 100%;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 80%;
        height: 80%;
      }
    }

    :deep(.cls-1) {
      fill: #fff;
    }

  }
}
</style>
