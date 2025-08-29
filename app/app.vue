<template>
  <main>
    <div class="title">
      <h1>Discord Profile Maker</h1>
    </div>
    <div class="container">
      <div class="left">
        <SmallProfile :profile="profile" />
        <NameplateProfile :profile="profile"/>
      </div>
      <div class="right">
        <div class="panel">
          <h2>Profile Information</h2>
          <strong>Avatar Decorations:</strong>
          <select v-model="selectedAvatarDecoration">
            <option v-for="item in avatarDecorations" :key="item.id" :value="item">
              {{ item.label }}
            </option>
          </select>
          <strong>Profile Effects:</strong>
          <select v-model="selectedProfileEffect">
            <option v-for="item in profileEffects" :key="item.id" :value="item">
              {{ item.title }}
            </option>
          </select>
          <p><strong>Username:</strong> {{ profile.username }}</p>
          <p><strong>Display Name:</strong> {{ profile.displayName }}</p>
          <p><strong>Pronouns:</strong> {{ profile.pronouns }}</p>
          <p><strong>About Me:</strong> {{ profile.aboutMe }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SmallProfile from "~/components/SmallProfile.vue";
import type {Profile} from "~/types/profile";
import NameplateProfile from "~/components/NameplateProfile.vue";
import avatarDecorationConfigs from "~/assets/avatar-decorations.json"
import profileEffectConfigs from "~/assets/profile-effects.json"
import nameplateConfigs from "~/assets/nameplates.json"
import type {AvatarDecoration} from "~/types/avatarDecoration";
import type {ProfileEffect} from "~/types/profileEffect";
import type {Nameplate} from "~/types/nameplate";

const avatarDecorations = avatarDecorationConfigs.avatar_decoration_configs as AvatarDecoration[];
const profileEffects = profileEffectConfigs.profile_effect_configs as ProfileEffect[];
const nameplates = nameplateConfigs.nameplate_configs as Nameplate[];

const selectedAvatarDecoration = ref<AvatarDecoration | null>(avatarDecorations[0] ?? null)
const selectedProfileEffect = ref<ProfileEffect | null>(profileEffects[0] ?? null)
const selectedNameplate = ref<Nameplate | null>({
  id: "1394404301337792532",
  sku_id: "1394404301295714355",
  asset: "nameplates/petal/spirit_blossom_petals/",
  label: "A pink and purple gradient background with floating petals surrounded by an ethereal aura.",
  palette: "violet"
})

const profile = ref<Profile>({
  username: "stmihan",
  displayName: "| STmihan |",
  pronouns: ':c',
  aboutMe: "⠠⠀⠀⠀⠰⢀⡀⠀⡤⠏⠀⠸⠈⠐⠀⠊⡸⡀⠈⠗⠈⣠⠍⠀",

  serverTag: {
    name: "DM",
    badgeSrc: "https://cdn.discordapp.com/clan-badges/269765356661374976/ad842b5ea717cde056d0093cb9e90d1d.png?size=16",
  },

  profileThemePrimary: "#150d0d",
  profileThemeAccent: "#552609",

  avatar: "https://cdn.discordapp.com/avatars/284032425519087626/a_20e32f679e2b5aa69c19d87362601b6f.webp?size=128&animated=true",
  profileBanner: "https://cdn.discordapp.com/banners/284032425519087626/a_3d2039ae5d431b94dae294a35dbb3671.webp?size=300&animated=true",
  
  nameplate: selectedNameplate.value,
  avatarDecoration: selectedAvatarDecoration.value,
  profileEffect: selectedProfileEffect.value,
});

watch(selectedAvatarDecoration, (val) => {
  profile.value.avatarDecoration = val;
})

watch(selectedProfileEffect, (val) => {
  profile.value.profileEffect = val
})

watch(selectedNameplate, (val) => {
  profile.value.nameplate = val
})

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
  width: 300px;
  gap: 12px;
}

.container {
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
