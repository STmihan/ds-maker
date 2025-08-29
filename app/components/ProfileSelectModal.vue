<template>
  <ProfileModal v-if="show" @close="close">
    <h2>{{ title }}</h2>
    <div class="items-list">
      <div v-for="item in items" :key="item.id" class="item-preview" :class="{selected: isSelected(item)}" @click="select(item)">
        <img v-if="item.thumbnailPreviewSrc || item.thumbnail" :src="item.thumbnailPreviewSrc || item.thumbnail" class="preview-img"/>
        <span>{{ item.label || item.title }}</span>
      </div>
    </div>
    <div class="actions">
      <button @click="confirm" :disabled="!selected">Выбрать</button>
      <button @click="close">Отмена</button>
    </div>
  </ProfileModal>
</template>

<script setup lang="ts">
import {ref, watch, defineEmits} from 'vue';
import ProfileModal from './ProfileModal.vue';

const props = defineProps<{
  show: boolean,
  items: any[],
  selectedId?: string,
  title: string
}>();
const emit = defineEmits(['close', 'select']);

const selected = ref<any>(null);

watch(() => props.selectedId, (val) => {
  selected.value = props.items.find(i => i.id === val) || null;
}, {immediate: true});

function select(item: any) {
  selected.value = item;
}
function confirm() {
  if (selected.value) emit('select', selected.value);
  close();
}
function close() {
  emit('close');
}
function isSelected(item: any) {
  return selected.value && item.id === selected.value.id;
}
</script>

<style scoped>
.items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
  max-height: 320px;
  overflow-y: auto;
}
.item-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  background: #18191c;
  min-width: 80px;
  max-width: 120px;
  transition: border 0.2s;
}
.item-preview.selected {
  border-color: #7289da;
  background: #232428;
}
.preview-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 6px;
  border-radius: 6px;
  background: #232428;
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
}
button {
  padding: 6px 18px;
  border-radius: 6px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s;
}
button:disabled {
  background: #444;
  cursor: not-allowed;
}
</style>
