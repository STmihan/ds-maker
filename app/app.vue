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
          <p><strong>Username:</strong> {{ profile.username }}</p>
          <p><strong>Display Name:</strong> {{ profile.displayName }}</p>
          <p><strong>Pronouns:</strong> {{ profile.pronouns }}</p>
          <p><strong>About Me:</strong> {{ profile.aboutMe }}</p>
          <p><strong>Server Tag:</strong> {{ profile.serverTagName }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SmallProfile from "~/components/smallProfile.vue";
import type {Profile} from "~/types/profile";
import NameplateProfile from "~/components/nameplateProfile.vue";

const profile: Profile = {
  username: "stmihan",
  displayName: "| STmihan |",
  pronouns: ':c',
  avatar: "https://cdn.discordapp.com/avatars/284032425519087626/a_20e32f679e2b5aa69c19d87362601b6f.webp?size=128&animated=true",
  avatarDecoration: "https://cdn.discordapp.com/avatar-decoration-presets/a_27f77b8147892bc271658ba19e4ecc06.png?size=160",
  profileBanner: "https://cdn.discordapp.com/banners/284032425519087626/a_3d2039ae5d431b94dae294a35dbb3671.webp?size=300&animated=true",
  profileEffect: [
    'https://cdn.discordapp.com/assets/profile_effects/effects/2024-09-09/fall-foliage/loop.png',
    'https://cdn.discordapp.com/assets/profile_effects/effects/2024-10-04/fall-foliage/intro-leaves.png',
    'https://cdn.discordapp.com/assets/profile_effects/effects/2024-09-09/fall-foliage/intro-branch.png'
  ],
  profileThemePrimary: "#150d0d",
  profileThemeAccent: "#552609",
  aboutMe: "⠠⠀⠀⠀⠰⢀⡀⠀⡤⠏⠀⠸⠈⠐⠀⠊⡸⡀⠈⠗⠈⣠⠍⠀",
  serverTagBadge: "https://cdn.discordapp.com/clan-badges/269765356661374976/ad842b5ea717cde056d0093cb9e90d1d.png?size=16",
  serverTagName: "DM",
  nameplate: "https://cdn.discordapp.com/assets/collectibles/nameplates/petal/spirit_blossom_petals/asset.webm",
};

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
