<template>
  <img
      v-if="src"
      ref="imgEl"
      :src="src"
      alt="Profile Effect Layer"
      class="effect-img"
      :style="imgStyle"
  />
</template>

<script setup lang="ts">
import {computed, ref, onMounted, onBeforeUnmount, watch, nextTick, defineExpose} from 'vue'
import type {ProfileAnimationEffect} from '~/types/profileEffect'

const props = defineProps<{
  effect: ProfileAnimationEffect
  randomize?: boolean
}>()

const src = computed(() => {
  const rand = props.effect.randomizedSources?.filter(Boolean) ?? []
  if (rand.length > 0) {
    if (props.randomize) {
      const idx = Math.floor(Math.random() * rand.length)
      return rand[idx]?.src || props.effect.src
    }
    return rand[0]?.src || props.effect.src
  }
  return props.effect.src
})

const imgStyle = computed(() => {
  const e = props.effect
  return {
    width: '100%',
    aspectRatio: `${e.width} / ${e.height}`,
    left: `${e.position.x}px`,
    top: `${e.position.y}px`,
    zIndex: String(e.zIndex),
    position: 'absolute',
    display: 'block',
    pointerEvents: 'none',
    visibility: 'hidden',
  } as Record<string, string>
})

const imgEl = ref<HTMLImageElement | null>(null)
const timers = new Set<number>()
let running = false

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      timers.delete(id)
      resolve()
    }, Math.max(0, Math.round(ms)))
    timers.add(id)
  })
}

function stopAll() {
  running = false
  for (const id of timers) clearTimeout(id)
  timers.clear()
  if (imgEl.value) {
    imgEl.value.style.visibility = 'hidden'
  }
}

async function playOnce({includeStartDelay}: { includeStartDelay: boolean }) {
  const el = imgEl.value
  if (!el) return

  const e = props.effect
  if (includeStartDelay && e.start > 0) {
    await wait(e.start)
  }
  if (!running) return

  el.style.visibility = 'visible'
  await wait(e.duration)
  if (!running) return

  el.style.visibility = 'hidden'
}

async function startAnimation() {
  stopAll()
  running = true
  await nextTick()

  await playOnce({includeStartDelay: true})
  if (!running) return

  if (!props.effect.loop) {
    running = false
    return
  }

  while (running) {
    await wait(props.effect.loopDelay)
    if (!running) break
    await playOnce({includeStartDelay: false})
  }
}

async function restartAnimation() {
  stopAll()
  await startAnimation()
}

defineExpose({
  restartAnimation,
})

onMounted(() => {
  startAnimation()
})
onBeforeUnmount(() => {
  stopAll()
})

watch(
    () => [props.effect, src.value],
    () => {
      restartAnimation()
    },
    {deep: true}
)
</script>

<style scoped>
.effect-img {
  position: absolute;
  display: block;
  pointer-events: none;
}
</style>
