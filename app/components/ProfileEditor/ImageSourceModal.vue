<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-window">
      <h3 class="modal-title">{{ title }}</h3>
      <div class="modal-actions">
        <button class="modal-btn" @click="onFileClick">Upload from computer</button>
        <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange"/>
        <button class="modal-btn" @click="showUrlInput = true">Paste image URL</button>
      </div>
      <div v-if="showUrlInput" class="url-input-row">
        <input v-model="url" class="url-input" placeholder="https://..."/>
        <button class="modal-btn" @click="onUrlSubmit" :disabled="!url">OK</button>
      </div>
      <button class="modal-close" @click="close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const {title} = defineProps<{ title: string }>();
const emit = defineEmits(['close', 'select-file', 'select-url']);
const showUrlInput = ref(false);
const url = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

function close() {
  emit('close');
}

function onFileClick() {
  fileInput.value?.click();
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (file) {
    emit('select-file', file);
  }
}

function onUrlSubmit() {
  if (url.value) {
    emit('select-url', url.value);
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  background: #232428;
  border-radius: 10px;
  padding: 18px 18px 14px 18px;
  min-width: 240px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}

.modal-title {
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.modal-btn {
  background: #5865f2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.modal-btn:hover {
  background: #4752c4;
}

.url-input-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.url-input {
  flex: 1;
  border-radius: 5px;
  border: 1px solid #232428;
  background: #18191c;
  color: #fff;
  padding: 5px 8px;
  font-size: 13px;
}

.modal-close {
  position: absolute;
  top: 6px;
  right: 10px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 18px;
  cursor: pointer;
}

.modal-close:hover {
  color: #fff;
}
</style>

