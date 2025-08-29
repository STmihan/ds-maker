<template>
  <div class="profile-panel compact">
    <div class="compact-row">
      <div class="avatar-wrap">
        <img
            :src="avatarUrl"
            alt="avatar"
            class="avatar-preview compact-img"
            @click="() => avatarInput?.click()"
        />
        <button class="reset-btn avatar-reset" title="Reset avatar" @click.stop="resetAvatar">
          <img src="~/assets/undo.png" alt="undo"/>
        </button>
      </div>
      <input
          ref="avatarInput"
          type="file"
          accept="image/*"
          @change="onAvatarChange"
          style="display:none"
      />
      <div class="banner-wrap">
        <div
            class="banner-preview compact-img banner-upload"
            @click="() => bannerInput?.click()"
        >
          <template v-if="profile.profileBanner">
            <img
                :src="profile.profileBanner"
                alt="banner"
                class="banner-img"
            />
          </template>
          <template v-else>
            <span class="banner-placeholder">click to change</span>
          </template>
        </div>
        <button class="reset-btn banner-reset" title="Reset banner" @click.stop="resetBanner">
          <img src="~/assets/undo.png" alt="undo"/>
        </button>
      </div>
      <input
          ref="bannerInput"
          type="file"
          accept="image/*"
          @change="onBannerChange"
          style="display:none"
      />
    </div>
    <div class="compact-row compact-fields">
      <input v-model="profile.username" maxlength="32" placeholder="Username" class="compact-input"/>
      <input v-model="profile.displayName" maxlength="32" placeholder="Display Name" class="compact-input"/>
      <input v-model="profile.pronouns" maxlength="32" placeholder="Pronouns" class="compact-input"/>
    </div>
    <textarea
        v-model="profile.aboutMe"
        maxlength="190"
        rows="2"
        placeholder="About Me"
        class="compact-input compact-textarea"
    />
    <div class="about-counter compact-counter">{{ profile.aboutMe.length }}/190</div>
    <div class="compact-row compact-pickers">
      <ProfileColorPicker label="Primary" v-model="profile.profileThemePrimary"/>
      <ProfileColorPicker label="Accent" v-model="profile.profileThemeAccent"/>
    </div>
    <div class="compact-row compact-selects">
      <button class="compact-btn" @click="showAvatarDecorationModal = true">
        <img
            v-if="profile.avatarDecoration"
            :src="getAvatarDecorationPreview(profile.avatarDecoration)"
            class="decoration-preview compact-img"
            alt="Decoration Preview"
        />
        <span v-else>Decoration</span>
      </button>
      <button class="compact-btn" @click="showProfileEffectModal = true">
        <img
            v-if="profile.profileEffect"
            :src="profile.profileEffect.thumbnailPreviewSrc"
            class="effect-preview compact-img"
            alt="Effect Preview"
        />
        <span v-else>Effect</span>
      </button>
      <button class="compact-btn" @click="showNameplateModal = true">
        <span v-if="profile.nameplate" class="nameplate">
          <NameplateView :nameplate="profile.nameplate"/>
        </span>
        <span v-else>Nameplate</span>
      </button>
    </div>
    <ProfileSelectModal
        :show="showAvatarDecorationModal"
        :items="avatarDecorationsList"
        :selectedId="profile.avatarDecoration?.id ?? null"
        title="Choose Decoration"
        @close="showAvatarDecorationModal = false"
        @select="onSelectAvatarDecoration"
    />
    <ProfileSelectModal
        :show="showProfileEffectModal"
        :items="profileEffectsList"
        :selectedId="profile.profileEffect?.id ?? null"
        title="Choose Effect"
        @close="showProfileEffectModal = false"
        @select="onSelectProfileEffect"
    />
    <ProfileSelectModal
        :show="showNameplateModal"
        :items="nameplatesList"
        :selectedId="profile.nameplate?.id ?? null"
        :isNameplate="true"
        title="Choose Nameplate"
        @close="showNameplateModal = false"
        @select="onSelectNameplate"
    />
  </div>
</template>

<script setup lang="ts">
function resetAvatar() {
  profile.value.avatar = '';
}

function resetBanner() {
  profile.value.profileBanner = '';
}

import {computed, ref, toRefs} from 'vue';
import ProfileSelectModal from './ProfileSelectModal.vue';
import ProfileColorPicker from './ProfileColorPicker.vue';
import type {AvatarDecoration} from '~/types/avatarDecoration';
import type {ProfileEffect} from '~/types/profileEffect';
import type {Nameplate} from '~/types/nameplate';
import type {Profile} from "~/types/profile";
import NameplateView from "~/components/Nameplates/NameplateView.vue";
import {defaultLogo} from "~/defaultProfile";

const props = defineProps<{
  profile: Profile,
  avatarDecorations: AvatarDecoration[],
  profileEffects: ProfileEffect[],
  nameplates: Nameplate[],
}>();

defineEmits([
  'update:profile',
]);

const {profile, avatarDecorations, profileEffects, nameplates} = toRefs(props);

const showAvatarDecorationModal = ref(false);
const showProfileEffectModal = ref(false);
const showNameplateModal = ref(false);

const avatarInput = useTemplateRef('avatarInput')
const bannerInput = useTemplateRef('bannerInput')

const avatarDecorationsList = computed(() =>
    [
      {
        id: "-1",
        title: '',
        thumbnailPreviewSrc: ''
      },
      ...avatarDecorations.value.map(d => ({
        ...d,
        thumbnailPreviewSrc: getAvatarDecorationPreview(d)
      }))
    ]);

const profileEffectsList = computed(() =>
    [
      {
        id: "-1",
        title: '',
        thumbnailPreviewSrc: ''
      }, ...profileEffects.value.map(e => ({
      ...e,
    }))
    ]
);

const nameplatesList = computed(() =>
    [
      {
        id: "-1",
        title: '',
        thumbnailPreviewSrc: ''
      },
      ...nameplates.value.map(n => ({
        ...n,
        thumbnailPreviewSrc: getNameplatePreview(n),
      }))
    ]
);

function getAvatarDecorationPreview(decoration: any) {
  return decoration?.asset
      ? `https://cdn.discordapp.com/avatar-decoration-presets/${decoration.asset}.png?size=80`
      : '';

}

function getNameplatePreview(nameplate: any) {
  return nameplate?.asset
      ? `https://cdn.discordapp.com/assets/collectibles/${nameplate.asset}asset.webm`
      : '';
}

const avatarUrl = computed(() => {
  return profile.value.avatar || defaultLogo;
})

function onSelectAvatarDecoration(item: AvatarDecoration | null) {
  profile.value.avatarDecoration = item;
  showAvatarDecorationModal.value = false;
}

function onSelectProfileEffect(item: ProfileEffect | null) {
  profile.value.profileEffect = item;
  showProfileEffectModal.value = false;
}

function onSelectNameplate(item: Nameplate | null) {
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
.avatar-wrap {
  position: relative;
  display: inline-block;
}

.banner-wrap {
  position: relative;
  display: inline-block;
}

.reset-btn {
  position: absolute;
  background: rgba(30, 30, 30, 0.85);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  transition: background 0.15s;
}

.reset-btn img {
  padding: 4px;
  width: 13px;
  height: 13px;
  pointer-events: none;
}

.reset-btn:hover {
  background: #5865f2;
}

.avatar-reset {
  top: -2px;
  right: -2px;
}

.banner-reset {
  top: -7px;
  right: -7px;
}

.banner-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232428;
  position: relative;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.banner-placeholder {
  color: #aaa;
  font-size: 14px;
  user-select: none;
}

.profile-panel.compact {
  background: #18191c;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  width: 340px;
  max-width: 100vw;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

.compact-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  width: 100%;
  box-sizing: border-box;
}

.compact-fields {
  flex-direction: column;
  gap: 6px;
}

.compact-input {
  background: #232428;
  color: #fff;
  border: 1px solid #232428;
  border-radius: 5px;
  padding: 4px 7px;
  font-size: 13px;
  outline: none;
  margin-bottom: 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.compact-input:focus {
  border-color: #5865f2;
}

.compact-textarea {
  resize: vertical;
  min-height: 32px;
  max-height: 60px;
  font-size: 13px;
}

.compact-counter {
  font-size: 11px;
  color: #888;
  text-align: right;
  margin-top: 0;
}

.compact-img.avatar-preview {
  width: 44px;
  height: 44px;
  margin-bottom: 0;
  border-radius: 50%;
  transition: box-shadow 0.15s;
}

.compact-img.avatar-preview:hover {
  cursor: pointer;
  box-shadow: 0 0 0 2px #5865f2;
}

.compact-img.banner-preview {
  width: 90px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 6px;
  transition: box-shadow 0.15s;
}

.compact-img.banner-preview:hover {
  cursor: pointer;
  box-shadow: 0 0 0 2px #5865f2;
}

.compact-pickers {
  gap: 10px;
}

.compact-selects {
  gap: 8px;
}

.compact-btn {
  background: #232428;
  border: 1px solid #232428;
  border-radius: 5px;
  padding: 2px 6px;
  min-width: 36px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
  transition: border 0.2s;
  box-sizing: border-box;
}

.compact-btn:hover {
  border-color: #5865f2;
}

.compact-img.decoration-preview, .compact-img.effect-preview {
  width: 24px;
  height: 24px;
  margin-right: 0;
}

.compact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0;
}

.compact-fields {
  flex-direction: column;
  gap: 4px;
}

.compact-input {
  background: #232428;
  color: #fff;
  border: 1px solid #232428;
  border-radius: 5px;
  padding: 4px 7px;
  font-size: 13px;
  outline: none;
  margin-bottom: 0;
  width: 100%;
  min-width: 0;
}

.compact-input:focus {
  border-color: #5865f2;
}

.compact-textarea {
  resize: vertical;
  min-height: 32px;
  max-height: 60px;
  font-size: 13px;
}

.compact-counter {
  font-size: 11px;
  color: #888;
  text-align: right;
  margin-top: 0;
}

.compact-img.avatar-preview {
  width: 64px;
  height: 64px;
  margin-bottom: 0;
}

.compact-img.banner-preview {
  width: 175px;
  height: 64px;
  margin-bottom: 0;
  border-radius: 8px;
}

.compact-pickers {
  gap: 10px;
}

.compact-selects {
  gap: 6px;
}

.compact-btn {
  background: #232428;
  border: 1px solid #232428;
  border-radius: 5px;
  padding: 2px 6px;
  min-width: 36px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
  transition: border 0.2s;
}

.compact-btn:hover {
  border-color: #5865f2;
}

.compact-img.decoration-preview, .compact-img.effect-preview {
  width: 24px;
  height: 24px;
  margin-right: 0;
}

.nameplate {
  height: 24px;
}

</style>
