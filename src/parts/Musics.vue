<script setup lang="ts">
import {AlbumData} from "../types/AlbumData.ts";
import AlbumComponent from "../components/album/Album.vue";

const albums :AlbumData[] = [{
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
      title: "The Battle of Cape Fear River",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Cannonball",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "P.A.R.T.Y.",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Under Blackened Banners",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Magyarország",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Seventh Rum of a Seventh Rum",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Bite the Hook Hand That Feeds",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Return to Tortuga",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Come to Brazil",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Wooden Leg (Part III)",
      link: "https://youtu.be/gsHmOb36-Js"
    }
  ]
},{
  title: "CURSE OF THE CRYSTAL COCONUT",
  label:  "Napalm Records",
  date: "24/05/2020",
  cover: "/covers/cover2.jpg",
  heightCover: "/covers/cover2-heightmap.png",
  songs: [
    {
      title: "Treasure Chest Party Quest",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Fannybaws",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Chomp Chomp",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Zombies Ate My Pirate Ship",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Call of the Waves",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Pirate's Scorn ",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Shit Boat (No Fans)",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Wooden Leg Part 2 (The Woodening)",
      link: "https://youtu.be/gsHmOb36-Js"
    },
    {
      title: "Henry Martin",
      link: "https://youtu.be/gsHmOb36-Js"
    }
  ]
}]












</script>

<template>
  <div class="musics">
    <h2>Our music</h2>

    <AlbumComponent v-for="(album,i) in albums" :key="i" :album="album" :inversed="i % 2 ===0" />
  </div>
</template>

<style scoped lang="scss">
.musics {
  width: 100%;
  padding: 20vh 0 5vh 0;

  h2 {
    margin-bottom: 10vh;
  }
}

</style>
