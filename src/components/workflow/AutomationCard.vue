<template>
  <div class="automation-card" @click="$emit('click')">
    <div class="automation-icon">{{ icon }}</div>
    <h3 class="automation-title">{{ title }}</h3>
    <p class="automation-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  templateName: string
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.automation-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.automation-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.dark .automation-card {
  background: #1f2937;
  border-color: #374151;
}
.automation-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.automation-title {
  font-weight: 600;
  font-size: 18px;
  color: #111827;
  margin-bottom: 4px;
}
.dark .automation-title {
  color: white;
}
.automation-description {
  font-size: 14px;
  color: #6b7280;
}
.dark .automation-description {
  color: #9ca3af;
}
</style> 