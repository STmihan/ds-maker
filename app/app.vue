<template>
  <main>
    <div class="container">
      <div class="left">
        <SmallProfile :profile="profile" />
        <NameplateProfile :profile="profile"/>
      </div>
      <div class="right">
        <ProfilePanel
          :profile="profile"
          :avatar-decorations="avatarDecorations"
          :profile-effects="profileEffects"
          :nameplates="nameplates"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import SmallProfile from "~/components/SmallProfile.vue";
import type {Profile} from "~/types/profile";
import NameplateProfile from "~/components/NameplateProfile.vue";
import ProfilePanel from "~/components/ProfilePanel.vue";
import avatarDecorationConfigs from "~/assets/avatar-decorations.json";
import profileEffectConfigs from "~/assets/profile-effects.json";
import nameplateConfigs from "~/assets/nameplates.json";
import type {AvatarDecoration} from "~/types/avatarDecoration";
import type {ProfileEffect} from "~/types/profileEffect";
import type {Nameplate} from "~/types/nameplate";

const avatarDecorations = avatarDecorationConfigs.avatar_decoration_configs as AvatarDecoration[];
const profileEffects = profileEffectConfigs.profile_effect_configs as ProfileEffect[];
const nameplates = nameplateConfigs.nameplate_configs as Nameplate[];

const profile = ref<Profile>({
  username: "stmihan",
  displayName: "| STmihan |",
  pronouns: ':c',
  aboutMe: "⠠⠀⠀⠀⠰⢀⡀⠀⡤⠏⠀⠸⠈⠐⠀⠊⡸⡀⠈⠗⠈⣠⠍⠀",
  // serverTag: {
  //   name: "DM",
  //   badgeSrc: "https://cdn.discordapp.com/clan-badges/269765356661374976/ad842b5ea717cde056d0093cb9e90d1d.png?size=16",
  // },
  serverTag: null,
  profileThemePrimary: "#150d0d",
  profileThemeAccent: "#552609",
  avatar: "https://cdn.discordapp.com/avatars/284032425519087626/a_20e32f679e2b5aa69c19d87362601b6f.webp?size=128&animated=true",
  profileBanner: "https://cdn.discordapp.com/banners/284032425519087626/a_3d2039ae5d431b94dae294a35dbb3671.webp?size=300&animated=true",
  nameplate: nameplates[0] ?? null,
  avatarDecoration: avatarDecorations[0] ?? null,
  profileEffect: profileEffects[0] ?? null,
});



</script>

<style>
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


.panel {
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 16px;
  background: #18191c;
  border-radius: 10px;
  padding: 20px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}
.form-group label {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 2px;
}
.form-group input[type="file"] {
  margin-top: 4px;
}
.file-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar-preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #232428;
}
.banner-preview {
  width: 80px;
  height: 32px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #232428;
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

.container {
  margin-top: 0.5rem;
  display: flex;
  padding: 20px;
  gap: 64px;
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
  }

  .left, .right {
    width: 100%;
    align-items: center;
  }
}
</style>
