<template>
  <main>
    <div class="container">
      <div class="left">
        <ProfilePreview :profile="profile"/>
        <NameplatePreview :profile="profile"/>
      </div>
      <div class="right">
        <ProfileEditor
            :profile="profile"
            :avatar-decorations="avatarDecorations"
            :profile-effects="profileEffects"
            :nameplates="nameplates"
        />
        <button class="share-btn" @click="shareProfile">Share</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';

import ProfilePreview from "~/components/ProfilePreview/ProfilePreview.vue";
import type {Profile} from "~/types/profile";
import NameplatePreview from "~/components/Nameplates/NameplatePreview.vue";
import ProfileEditor from "~/components/ProfileEditor/ProfileEditor.vue";
import avatarDecorationConfigs from "~/assets/avatar-decorations.json";
import profileEffectConfigs from "~/assets/profile-effects.json";
import nameplateConfigs from "~/assets/nameplates.json";
import type {AvatarDecoration} from "~/types/avatarDecoration";
import type {ProfileEffect} from "~/types/profileEffect";
import type {Nameplate} from "~/types/nameplate";
import defaultProfile from "~/defaultProfile";

const avatarDecorations = avatarDecorationConfigs.avatar_decoration_configs as AvatarDecoration[];
const profileEffects = profileEffectConfigs.profile_effect_configs as ProfileEffect[];
const nameplates = nameplateConfigs.nameplate_configs as Nameplate[];

function decodeProfileFromUrl(str: string): Profile | null {
  try {
    const json = decodeURIComponent(atob(str));
    return JSON.parse(json);
  } catch {
    window.location.href = window.location.origin + window.location.pathname;
    return null;
  }
}

function encodeProfileToUrl(profile: Profile): string {
  const json = JSON.stringify(profile);
  return btoa(encodeURIComponent(json));
}

const profile = ref<Profile>(defaultProfile);

onMounted(() => {
  const url = new URL(window.location.href);
  const config = url.searchParams.get('profile');
  if (config) {
    const decoded = decodeProfileFromUrl(config);
    if (decoded) {
      profile.value = {
        ...profile.value,
        ...decoded
      };
    }
  }
});

function shareProfile() {
  const encoded = encodeProfileToUrl(profile.value);
  const url = new URL(window.location.href);
  url.searchParams.set('profile', encoded);
  window.navigator.clipboard.writeText(url.toString());
  alert('Profile link copied to clipboard!');
}


</script>

<style>
.container {
  padding: 64px 0;
  display: flex;
  gap: 64px;
}

.share-btn {
  margin-top: 18px;
  padding: 7px 18px;
  border-radius: 6px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s;
}

.share-btn:hover {
  background: #4752c4;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'gg sans', sans-serif;
  font-weight: 400;
  background-color: #323339;
  color: #ffffff;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.form-group label {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 2px;
}

.form-group input[type="file"] {
  margin-top: 4px;
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

.left {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 0;
    padding: 32px 0;
  }

  .left, .right {
    width: 100%;
    align-items: center;
  }
}
</style>
