<script setup lang="ts">
import {AlbumData} from "../../types/AlbumData.ts";
import Cover from "./Cover.vue";
import {PropType} from "vue";
import Path from "./Path.vue";
import SongList from "./SongList.vue";

defineProps({
  album: {
    type: Object as PropType<AlbumData>,
    required: true
  }
})
</script>

<template>
  <Path class="path"/>
  <div class="album">
    <Cover :url="album.cover"/>

    <div class="album__right">
      <h4 class="album__title">{{album.title}}</h4>
      <p class="album__subtitle">{{album.label}}, {{album.date}}</p>
      <SongList :songs="album.songs"/>

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
  width: clamp(300px, 80%, 800px);
  margin: 40px auto;

  &__right {
    text-align: left;
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
</style>
