<template>
  <div class="color-picker">
    <label>{{ label }}</label>
  <input type="color" :value="modelValue" @input="onInput" />
    <span class="color-value">{{ modelValue }}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: string,
  label: string
}>();
const emit = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emit('update:modelValue', target.value);
  }
}
</script>

<style scoped>
.color-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}
input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
}
.color-value {
  font-size: 13px;
  color: #aaa;
}
</style>
