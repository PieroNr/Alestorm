<script setup lang="ts">
import {Song} from "../../types/Song.ts";

defineProps<{ songs: Song[] }>()
</script>

<template>
  <div class="song-list">
    <div class="song-list__item" v-for="song in songs" :key="song.title">
      <div class="song-list__item__title">
        <p>{{ song.title }}</p>
      </div>
      <a class="song-list__item__link" :href="song.link" target="_blank"><img src="../../assets/img/youtube.svg"></a>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

      img {
        height: 30px;
        aspect-ratio: 1/1;
      }
    }


  }
}
</style>
