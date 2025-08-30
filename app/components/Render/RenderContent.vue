<template>
  <div class="render-content-inner">
    <ProfilePreview
        :profile="profile"
        :avatar-decorations="avatarDecorations"
        :profile-effects="profileEffects"
        :nameplates="nameplates"
    />
    <div style="width:32px;"></div>
    <NameplatePreview
        :profile="profile"
        :avatar-decorations="avatarDecorations"
        :profile-effects="profileEffects"
        :nameplates="nameplates"
    />
  </div>
</template>

<script setup lang="ts">
import ProfilePreview from '~/components/ProfilePreview/ProfilePreview.vue';
import NameplatePreview from '~/components/Nameplates/NameplatePreview.vue';
import type {Profile} from '~/types/profile';
import type {AvatarDecoration} from '~/types/avatarDecoration';
import type {ProfileEffect} from '~/types/profileEffect';
import type {Nameplate} from '~/types/nameplate';

defineProps<{
  profile: Profile,
  avatarDecorations: AvatarDecoration[],
  profileEffects: ProfileEffect[],
  nameplates: Nameplate[],
}>();
</script>

<style scoped>
.render-content-inner {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  background: #18191c;
  border-radius: 10px;
  padding: 32px 32px;
}
</style>

