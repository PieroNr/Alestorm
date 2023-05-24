<script setup lang="ts">
import {Camera, Plane, PointLight, Renderer, Scene, ShaderMaterial, Texture, Box, LambertMaterial} from "troisjs";
import {useMouse, useResizeObserver} from "@vueuse/core";
import {computed, ref} from "vue";
import {Vector2, Vector4} from "three";

const props = defineProps<{ url: string, heightUrl: string }>()
const container = ref<HTMLElement | null>(null)
const aspectRatio = ref<number>(1)
const ratio = window.devicePixelRatio
const width = ref<number>(0)
const height = ref<number>(0)
const a1 = ref<number>(0)
const a2 = ref<number>(0)

const time = ref<number>(0)

const startTime = new Date().getTime();

function render() {
  let now = new Date().getTime();
  time.value = (now - startTime) / 1000;
  requestAnimationFrame(render)
}

render()

const threshold = new Vector2(35, 15)

const {x: mouseX, y: mouseY} = useMouse()

const resolution = computed(() => {
  return new Vector4(width.value, height.value, a1.value, a2.value)
})

const mouse = computed(() => {
  return new Vector2(mouseX.value, mouseY.value)
})

const uniforms = computed(() => {
  return {
    pixelRatio: {value: ratio, type: 'float'},
    resolution: {value: resolution.value, type: 'vec4'},
    mouse: {value: mouse.value, type: 'vec2'},
    threshold: {value: threshold, type: 'vec2'},
    time: {value: time.value, type: 'float'},
  }
})

useResizeObserver(container, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
  if (height.value / width.value < aspectRatio.value) {
    a1.value = 1;
    a2.value = (height.value / width.value) / aspectRatio.value;
  } else {
    a1.value = (width.value / height.value) * aspectRatio.value;
    a2.value = 1;
  }

})

const vertex = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4( a_position, 0, 1 );
}
`

const fragment = `
#ifdef GL_ES
  precision mediump float;
#endif

uniform vec4 resolution;
uniform vec2 mouse;
uniform vec2 threshold;
uniform float time;
uniform float pixelRatio;
uniform sampler2D image0;
uniform sampler2D image1;


vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {
  // uvs and textures
  vec2 uv = pixelRatio*gl_FragCoord.xy / resolution.xy ;
  vec2 vUv = (uv - vec2(0.5))*resolution.zw + vec2(0.5);
  vUv.y = 1. - vUv.y;
  vec4 tex1 = texture2D(image1,mirrored(vUv));
  vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5)*mouse.x/threshold.x, vUv.y + (tex1.r - 0.5)*mouse.y/threshold.y);
  gl_FragColor = texture2D(image0,mirrored(fake3d));
}
`
</script>

<template>
  <div class="cover" ref="container">
    <img :src="url" alt="" class="cover__image"/>
    <Renderer ref="renderer" width="300" height="300">
      <Camera :position="{ z: 10 }"/>
      <Scene>
        <PointLight :position="{ y: 50, z: 50 }"/>
        <Plane ref="box" :scale="{x : 9.5, y :9.5}">
          <ShaderMaterial
              :props="{ uniforms: uniforms, vertexShader: vertex, fragmentShader: fragment, wireframe:true }">
            <Texture :src="url" uniform="image0"/>
            <Texture :src="heightUrl" uniform="image1"/>
          </ShaderMaterial>
        </Plane>
      </Scene>
    </Renderer>

  </div>
</template>

<style scoped lang="scss">

</style>
