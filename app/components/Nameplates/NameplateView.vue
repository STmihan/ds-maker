<template>
  <div class="nameplate" :style="nameplatePalette">
    <video :src="nameplateUrl" autoplay muted loop/>
  </div>
</template>

<script setup lang="ts">
import {type Nameplate, nameplatePaletteMap} from "~/types/nameplate";

const {nameplate} = defineProps<{
  nameplate: Nameplate | null
}>()

const nameplatePalette = computed(() => {
  return {
    backgroundImage: nameplatePaletteMap[nameplate?.palette || 'default'],
  };
})

const nameplateUrl = computed(() => {
  if (nameplate) {
    return `https://cdn.discordapp.com/assets/collectibles/${nameplate.asset}asset.webm`
  } else {
    return ''
  }
})

</script>

<style scoped>
.nameplate {
  width: 100%;
  border-radius: 10px;
  position: relative;
  aspect-ratio: 224 / 42;
}

.nameplate video {
  width: 100%;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>