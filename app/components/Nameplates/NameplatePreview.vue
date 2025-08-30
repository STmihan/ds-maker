<template>
  <div class="panel">
    <div class="user">
      <div class="avatar rounded"></div>
      <div class="name name-2 null"></div>
      <div class="status-bg"></div>
      <div class="status"></div>
    </div>
    <div class="user">
      <div class="nameplate-container">
        <NameplateView :nameplate="profile.nameplate" class="nameplate"/>
      </div>
      <div class="avatar avatar-user">
        <img :src="avatarUrl" alt="Avatar" class="avatar-img"/>
        <template v-if="profile.avatarDecoration">
          <img
              class="avatar-decoration"
              :src="avatarDecorationUrl"
              alt="Decoration"
          />
        </template>
      </div>
      <div class="name display-name">
        {{ profile.displayName }}
      </div>
    </div>
    <div class="user">
      <div class="avatar rounded"></div>
      <div class="name name-2 null"></div>
      <div class="status-bg"></div>
      <div class="status"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Profile} from "~/types/profile";
import NameplateView from "~/components/Nameplates/NameplateView.vue";
import {computed} from "vue";
import {defaultLogo} from "~/defaultProfile";
import {globalUrlToLocalPath} from "~/utils/urlConverter";

const {profile} = defineProps<{
  profile: Profile
}>();

const avatarUrl = computed(() => {
  return profile.avatar || defaultLogo;
})

const avatarDecorationUrl = computed(() => {
  if (profile.avatarDecoration) {
    return globalUrlToLocalPath(`https://cdn.discordapp.com/avatar-decoration-presets/${profile.avatarDecoration.asset}.png?size=160`)
  } else {
    return ''
  }
})


</script>

<style scoped>
.panel {
  background-color: #101213;
  color: #e5e3e3;
  width: 260px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  padding: 10px 15px;
}

.user {
  position: relative;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.avatar {
  width: 36px;
  height: 36px;
  background-color: #1e1f22;
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-user {
  background: transparent;
}

.avatar-img {
  border-radius: 50%;
}

.avatar-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.name {
  position: absolute;
  height: 20px;

  margin-left: 60px;
  margin-top: 15px;
  color: #e5e3e3;
}

.name.null {
  border-radius: 50px;
  background-color: #1e1f22;
}

.name.name-2 {
  width: 130px;
}

.status-bg {
  position: absolute;
  top: 29px;
  left: 32px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #101213;
}

.status {
  position: absolute;
  top: 33px;
  left: 36px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #1e1f22;
}

.nameplate-container {
  width: 250px;
}

.nameplate {
  position: absolute;
}

.rounded {
  border-radius: 50%;
}
</style>