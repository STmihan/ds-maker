<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-content">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #232428;
  border-radius: 12px;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
</style>
