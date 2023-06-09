<script setup lang="ts">
import {AlbumData} from "../../types/AlbumData.ts";
import Cover from "./Cover.vue";
import Map from "./Map.vue";
import {onMounted, PropType, ref} from "vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Youtube from "./icons/youtube.vue";


const songElements = ref<HTMLElement[]>([]);
const albumElement = ref<HTMLElement | null>(null);

gsap.registerPlugin(ScrollTrigger);
defineProps({
  album: {
    type: Object as PropType<AlbumData>,
    required: true
  },
  inversed: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  gsap.from(songElements.value,{
    opacity: 0,
    y: 200,
    stagger: 0.1,
    duration: 0.5,
    scrollTrigger: {
      trigger: albumElement.value,
      start: 'top 10%',
      end: '+=500',
      scrub: 0.1,
      pin:true,
      snap:0.1
    }
  })
})
</script>

<template>
  <Map/>
  <div class="album" ref="albumElement" :class="{'album--inversed':inversed}">
    <Cover :url="album.cover" :height-url="album.heightCover" class="album__left"/>

    <div class="album__right">
      <h4 class="album__title">{{album.title}}</h4>
      <p class="album__subtitle">{{album.label}}, {{album.date}}</p>
      <div class="song-list">
        <div class="song-list__item" v-for="song in album.songs" :key="song.title" ref="songElements">
          <div class="song-list__item__title">
            <p>{{ song.title }}</p>
          </div>
          <a class="song-list__item__link" :href="song.link" target="_blank">
            <youtube/>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

.path {
  margin-top: 20px;
}
.album {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  width: clamp(300px, 80%, 800px);
  margin: 40px auto;
  gap: 20px;

  &--inversed {
    grid-template-areas: 'right left';
  }

  &__right {
    grid-area: right;
    text-align: left;
  }

  &__left {
    grid-area: left;
  }

  &__title {
    margin:  0;
    font-size: 40px;
    line-height: 48px;
  }

  &__subtitle {
    margin-bottom: 25px;
    font-size: 16px;
  }
}

.song-list {
  display: flex;
  gap: 10px;
  flex-direction: column;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;

    &__link {
      display: flex;
      color: inherit;

      svg {
        height: 30px;
        aspect-ratio: 1/1;
      }
    }


  }
}
</style>
