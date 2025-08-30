<template>
  <div class="render-backdrop" @click.self="onClose">
    <div class="render-modal">
      <RenderContent
          id="render-content"
          :profile="profile"
          :avatar-decorations="avatarDecorations"
          :profile-effects="profileEffects"
          :nameplates="nameplates"
      />
      <button class="render-btn" @click="onRender">Render</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderContent from './RenderContent.vue';
import type {Profile} from '~/types/profile';
import type {AvatarDecoration} from '~/types/avatarDecoration';
import type {ProfileEffect} from '~/types/profileEffect';
import type {Nameplate} from '~/types/nameplate';
import {generateProfileGif} from '~/utils/gifShare';

const {
  profile,
  avatarDecorations,
  profileEffects,
  nameplates,
} = defineProps<{
  profile: Profile,
  avatarDecorations: AvatarDecoration[],
  profileEffects: ProfileEffect[],
  nameplates: Nameplate[],
}>();
const emit = defineEmits(['close']);

function onClose() {
  emit('close');
}

function onRender() {
  console.log('Generating GIF...');
  generateProfileGif();
}
</script>

<style scoped>
.render-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.render-modal {
  background: #232428;
  border-radius: 14px;
  padding: 32px 32px 24px 32px;
  min-width: 420px;
  max-width: 96vw;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.render-btn {
  margin-top: 28px;
  padding: 10px 32px;
  border-radius: 8px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.18s;
}

.render-btn:hover {
  background: #4752c4;
}
</style>

