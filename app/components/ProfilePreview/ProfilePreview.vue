<template>
  <div class="profile" :style="profileThemeStyles">
    <div v-if="profile.profileEffect" class="profile-effect-container">
      <ProfilePreviewEffectLayer
          v-for="(layer, index) in profile.profileEffect.effects"
          :key="index"
          :effect="layer"
          :force-reduced-motion="false"
          :randomize="true"/>
    </div>
    <div class="profile-popout">

      <header class="profile-header">
        <div class="banner" :style="{ backgroundImage: `url(${profile.profileBanner})` }"></div>
        <div class="avatar-wrapper">
          <img :src="avatarUrl" alt="Avatar" class="avatar-img"/>
          <img
              v-if="profile.avatarDecoration"
              :src="avatarDecorationUrl"
              alt="Avatar Decoration"
              class="avatar-decoration"/>
        </div>
      </header>

      <div class="profile-body">
        <div class="names">
          <h3 class="display-name">{{ profile.displayName }}</h3>
          <div class="username-details">
            <span class="username">{{ profile.username }}</span>
            <span class="username-dot">•</span>
            <span v-if="profile.pronouns" class="pronouns">{{ profile.pronouns }}</span>
          </div>
        </div>
        <div class="divider"></div>

        <div class="about-me">
          <h4>ABOUT ME</h4>
          <p>{{ profile.aboutMe }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {computed} from 'vue';
import type {Profile} from "~/types/profile";
import {defaultLogo} from "~/defaultProfile";
import {globalUrlToLocalPath} from "~/utils/urlConverter";

const {profile} = defineProps<{
  profile: Profile;
}>()

const isColorLight = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

const profileThemeStyles = computed(() => ({
  '--profile-bg': profile.profileThemePrimary,
  '--profile-accent': profile.profileThemeAccent,
  '--profile-text': isColorLight(profile.profileThemePrimary) ? '#393030' : '#e5e3e3',
  '--profile-text-muted': isColorLight(profile.profileThemePrimary) ? '#716663' : '#d9d4d2',
}));

const avatarDecorationUrl = computed(() => {
  if (profile.avatarDecoration) {
    return globalUrlToLocalPath(`https://cdn.discordapp.com/avatar-decoration-presets/${profile.avatarDecoration.asset}.png?size=160`)
  } else {
    return ''
  }
})

const avatarUrl = computed(() => {
  return profile.avatar || defaultLogo;
})

</script>

<style scoped>

.profile {
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  background: linear-gradient(var(--profile-bg), var(--profile-accent));
  padding: 4px;
}

.profile-popout {
  background-color: var(--profile-bg);
  color: var(--profile-text);
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.profile-effect-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  pointer-events: none;
}

.profile-header {
  position: relative;
  height: 120px;
  z-index: 1;
}

.banner {
  height: 105px;
  background-size: cover;
  background-position: center;
  background-color: var(--profile-accent);
}

.avatar-wrapper {
  position: absolute;
  left: 16px;
  top: 51px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 6px solid var(--profile-bg);
  background-color: var(--profile-bg);
  z-index: 2;
}

.avatar-img, .avatar-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  z-index: 1;
}

.avatar-decoration {
  width: 104px;
  height: 104px;
  z-index: 2;
  top: 40%;
}

.profile-body {
  padding: 0 16px 16px;
  margin-top: 40px;
  position: relative;
  z-index: 1;
}

.names {
  margin-bottom: 8px;
}

.display-name {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: var(--profile-text);
}

.username-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-size: 14px;
  color: var(--profile-text);
}

.username-dot {
  font-size: 14px;
  color: var(--profile-text);
  font-weight: 700;
}

.pronouns {
  font-size: 14px;
  color: var(--profile-text);
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 16px 0;
}

.about-me h4 {
  font-size: 12px;
  font-weight: 700;
  color: var(--profile-text);
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.about-me p {
  font-size: 14px;
  color: var(--profile-text-muted);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
