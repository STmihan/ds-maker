<template>
  <div class="profile-panel">
    <h2>Профиль</h2>
    <div class="panel-grid">
      <div class="form-group avatar-group">
        <label>Avatar:</label>
        <img :src="profile.avatar" alt="avatar" class="avatar-preview" />
        <input type="file" accept="image/*" @change="onAvatarChange" />
      </div>
      <div class="form-group banner-group">
        <label>Profile Banner:</label>
        <img :src="profile.profileBanner" alt="banner" class="banner-preview" />
        <input type="file" accept="image/*" @change="onBannerChange" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input v-model="profile.username" maxlength="32" />
      </div>
      <div class="form-group">
        <label>Display Name:</label>
        <input v-model="profile.displayName" maxlength="32" />
      </div>
      <div class="form-group">
        <label>Pronouns:</label>
        <input v-model="profile.pronouns" maxlength="32" />
      </div>
      <div class="form-group about-group">
        <label>About Me:</label>
        <textarea v-model="profile.aboutMe" maxlength="190" rows="3" />
        <div class="about-counter">{{ profile.aboutMe.length }}/190</div>
      </div>
      <ProfileColorPicker label="Theme Primary" v-model="profile.profileThemePrimary" />
      <ProfileColorPicker label="Theme Accent" v-model="profile.profileThemeAccent" />
      <div class="form-group">
        <label>Avatar Decoration:</label>
        <button @click="showAvatarDecorationModal = true">Выбрать...</button>
        <div v-if="profile.avatarDecoration" class="preview-row">
          <img :src="'https://cdn.discordapp.com/avatar-decoration-presets/' + profile.avatarDecoration.asset + '.png?size=80'" :alt="profile.avatarDecoration.label" class="decoration-preview" />
          <span>{{ profile.avatarDecoration.label }}</span>
        </div>
      </div>
      <div class="form-group">
        <label>Profile Effect:</label>
        <button @click="showProfileEffectModal = true">Выбрать...</button>
        <div v-if="profile.profileEffect" class="preview-row">
          <img :src="profile.profileEffect.thumbnailPreviewSrc" :alt="profile.profileEffect.title" class="effect-preview" />
          <span>{{ profile.profileEffect.title }}</span>
        </div>
        <button v-if="profile.profileEffect" class="null-btn" @click="setProfileEffectNull">Сбросить эффект</button>
      </div>
      <div class="form-group">
        <label>Nameplate:</label>
        <button @click="showNameplateModal = true">Выбрать...</button>
        <div v-if="profile.nameplate" class="preview-row">
          <span>{{ profile.nameplate.label }}</span>
        </div>
      </div>
    </div>
    <ProfileSelectModal
      :show="showAvatarDecorationModal"
      :items="avatarDecorations"
      :selectedId="profile.avatarDecoration?.id"
      title="Выберите декорацию"
      @close="showAvatarDecorationModal = false"
      @select="onSelectAvatarDecoration"
    />
    <ProfileSelectModal
      :show="showProfileEffectModal"
      :items="[{id: null, title: 'Нет эффекта', thumbnailPreviewSrc: ''}, ...profileEffects]"
      :selectedId="profile.profileEffect?.id ?? null"
      title="Выберите эффект"
      @close="showProfileEffectModal = false"
      @select="onSelectProfileEffect"
    />
    <ProfileSelectModal
      :show="showNameplateModal"
      :items="nameplates"
      :selectedId="profile.nameplate?.id"
      title="Выберите nameplate"
      @close="showNameplateModal = false"
      @select="onSelectNameplate"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue';
import ProfileSelectModal from './ProfileSelectModal.vue';
import ProfileColorPicker from './ProfileColorPicker.vue';
import type {AvatarDecoration} from '~/types/avatarDecoration';
import type {ProfileEffect} from '~/types/profileEffect';
import type {Nameplate} from '~/types/nameplate';

const props = defineProps<{
  profile: any,
  avatarDecorations: AvatarDecoration[],
  profileEffects: ProfileEffect[],
  nameplates: Nameplate[],
}>();
const emit = defineEmits([
  'update:profile',
]);
const {profile, avatarDecorations, profileEffects, nameplates} = toRefs(props);

const showAvatarDecorationModal = ref(false);
const showProfileEffectModal = ref(false);
const showNameplateModal = ref(false);

function onSelectAvatarDecoration(item: AvatarDecoration) {
  profile.value.avatarDecoration = item;
  showAvatarDecorationModal.value = false;
}
function onSelectProfileEffect(item: ProfileEffect | {id: null}) {
  if (!item.id) profile.value.profileEffect = null;
  else profile.value.profileEffect = item;
  showProfileEffectModal.value = false;
}
function setProfileEffectNull() {
  profile.value.profileEffect = null;
}
function onSelectNameplate(item: Nameplate) {
  profile.value.nameplate = item;
  showNameplateModal.value = false;
}
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function onAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (file) {
    profile.value.avatar = await fileToBase64(file);
  }
}
async function onBannerChange(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (file) {
    profile.value.profileBanner = await fileToBase64(file);
  }
}
</script>

<style scoped>
.profile-panel {
  background: #18191c;
  border-radius: 10px;
  padding: 20px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  width: 650px;
  max-width: 100vw;
}
.panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 24px;
}
@media (max-width: 900px) {
  .profile-panel {
    width: 100%;
    min-width: 0;
  }
  .panel-grid {
    grid-template-columns: 1fr;
  }
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.avatar-group, .banner-group {
  align-items: center;
  justify-content: flex-start;
}
.avatar-preview {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #232428;
  margin-bottom: 4px;
}
.banner-preview {
  width: 100px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #232428;
  margin-bottom: 4px;
}
.decoration-preview, .effect-preview {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
  background: #232428;
  margin-right: 8px;
}
.preview-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.about-counter {
  font-size: 12px;
  color: #888;
  text-align: right;
  margin-top: 2px;
}
.form-group input, .form-group textarea {
  background: #232428;
  color: #fff;
  border: 1px solid #232428;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 15px;
  outline: none;
  margin-bottom: 2px;
}
.form-group input:focus, .form-group textarea:focus {
  border-color: #5865f2;
}
.form-group textarea {
  resize: vertical;
  min-height: 48px;
  max-height: 120px;
}
.form-group button {
  margin-top: 4px;
  padding: 5px 14px;
  border-radius: 6px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.form-group button:hover {
  background: #4752c4;
}
.null-btn {
  margin-top: 6px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  cursor: pointer;
}
.null-btn:hover {
  background: #222;
}
</style>
