<script setup lang="ts">
import {AlbumData} from "../types/AlbumData.ts";
import AlbumComponent from "../components/album/Album.vue";

const album :AlbumData = {
  title: "SEVENTH RUM OF A SEVENTH RUM",
  label:  "Napalm Records",
  date: "24/06/2022",
  cover: "/covers/cover1.jpg",
  heightCover: "/covers/cover1-heightmap.png",
  songs: [
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magellan's Expedition",
      link: "https://youtu.be/gsHmOb36-Js"
    }
  ]
}
</script>

<template>
  <div class="musics">
    <h2>Our music</h2>

    <AlbumComponent :album="album"/>
    <AlbumComponent :album="album"/>
  </div>
</template>

<style scoped lang="scss">
.musics {
  width: 100%;
  padding: 20vh 0;

  h2 {

  }
}

</style>
