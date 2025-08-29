<template>
  <div class="panel">
    <div class="user">
      <div class="avatar"></div>
      <div class="name name-2 null"></div>
      <div class="status-bg"></div>
      <div class="status"></div>
    </div>
    <div class="user">
      <Nameplate :nameplate="profile.nameplate" class="nameplate"/>
      <div class="avatar">
        <img :src="profile.avatar" alt="Avatar"/>
      </div>
      <div class="name display-name">
        {{ profile.displayName }}
      </div>
    </div>
    <div class="user">
      <div class="avatar"></div>
      <div class="name name-2 null"></div>
      <div class="status-bg"></div>
      <div class="status"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Profile} from "~/types/profile";
import Nameplate from "~/components/Nameplate.vue";

const {profile} = defineProps<{
  profile: Profile
}>();

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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1e1f22;
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  position: absolute;
  height: 20px;

  margin-left: 60px;
  margin-top: 15px;
  color: #e5e3e3;
}

.name.name-1 {
  width: 100px;
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

.nameplate {
  position: absolute;
}
</style>