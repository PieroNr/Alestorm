<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {random, spline, createCoordsTransformer} from "@georgedoescode/generative-utils";
import {Container, Path, SVG} from '@svgdotjs/svg.js'

gsap.registerPlugin(ScrollTrigger);

const container = ref<SVGElement | null>(null);
const maskElement = ref<SVGElement | null>(null);
const currentPath = ref<Path | null>(null);
const points = ref<{ x: number, y: number }[]>([]);
const liquidPoints = ref<{ x: number, y: number }[]>([]);
const maxDist = ref<null | { x: number, y: number }>(null)
const props = defineProps<{svgHeight:number}>()
const numSteps = 8;
const options = {
  detail: 16,
  tension: 1,
  close: true,
  range: {
    x: 20,
    y: 20
  },
  axis: ["x", "y"]
}
const transformCoords = ref<null | any>(null)

function generate(svg: Container) {
  const {width,height} = svg.viewbox();
  const stepSize = height / numSteps;
  // clear the contents of the icons
  svg.clear();

  // plot 10 equally spaced points along the canvas width
  for (let y = 0; y <= height; y += stepSize) {
    // y = vertical center of the viewport (100) +/- 10
    const x = random(40, 150);

    // render an svg circle at the current { x, y } position

    // store the { x, y } coordinate to use later
    points.value.push({
      x,
      y
    });
  }

  liquidPoints.value = [...points.value]

  const group = svg.group();

  group.rect(width, height).fill("white");
  maskElement.value = group.rect(width, 0).fill("brown");

  // array of { x, y } coordinates, tension, "close" the shape
  const pathData = spline(points.value, 1, false);
  // render an svg <path> using the spline path data
  currentPath.value = svg.path(pathData).stroke({
    color: 'white',
    width: 6,
    dasharray: "20 20",
    linejoin: 'round'
  }).fill("none");

  const mask = svg.mask().add(currentPath.value)
  group.maskWith(mask)

  const pointDistance = Math.hypot(
      points.value[0].x - points.value[1].x,
      points.value[0].y - points.value[1].y
  );

  maxDist.value = {
    x: options.axis.includes("x") ? pointDistance / 2 : 0,
    y: options.axis.includes("y") ? pointDistance / 2 : 0
  };

  gsap.ticker.add(() => {
    gsap.set(currentPath.value.node, {
      attr: {
        d: spline(liquidPoints.value, 2, false)
      }
    });
  });
}


function onMouseMove(e: MouseEvent) {
  const {x, y} = transformCoords.value(e);
  const mousePos = {
    x,
    y
  };

  liquidPoints.value.forEach((point, index) => {
    const pointOrigin = {...points.value[index]};
    const distX = Math.abs(pointOrigin.x - mousePos.x);
    const distY = Math.abs(pointOrigin.y - mousePos.y);

    if (distX <= options.range.x && distY <= options.range.y) {
      const difference = {
        x: pointOrigin.x - mousePos.x,
        y: pointOrigin.y - mousePos.y
      };

      const target = {
        x: pointOrigin.x + difference.x,
        y: pointOrigin.y + difference.y
      };

      const x = gsap.utils.clamp(
          pointOrigin.x - maxDist.value.x,
          pointOrigin.x + maxDist.value.x,
          target.x
      );

      const y = gsap.utils.clamp(
          pointOrigin.y - maxDist.value.y,
          pointOrigin.y + maxDist.value.y,
          target.y
      );

      gsap.to(point, {
        x: x,
        y: y,
        ease: "power1.easeOut",
        overwrite: true,
        duration: 0.5,
        onComplete() {
          gsap.to(point, {
            x: pointOrigin.x,
            y: pointOrigin.y,
            ease: "elastic.out",
            duration: 1
          });
        }
      });
    }
  });
}

onMounted(() => {
  const svg = SVG(container.value);
  generate(svg);
  transformCoords.value = createCoordsTransformer(container.value);
  gsap.to(maskElement.value.node, {
    height:props.svgHeight,
    duration: 1,
    scrollTrigger: {
      trigger: container.value,
      scrub:0.3,
      start: 'top 50%',
    },
    ease: 'power3.easeOut'
  })

  window.addEventListener('mousemove', onMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
});
</script>

<template>
  <svg class="container" :height="svgHeight" viewBox="0 0 193 691" fill="none" xmlns="http://www.w3.org/2000/svg"
       ref="container">
  </svg>

</template>

<style scoped lang="scss">
.brown {
  stroke-dashoffset: 100000;
}

.container {
  width: 100%;
}
</style>
