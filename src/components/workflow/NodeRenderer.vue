<template>
  <div class="custom-node" :class="{ 'webhook-node': isWebhook }" @click="handleClick">
    <Handle v-if="!isWebhook" type="target" :position="Position.Left" class="handle-left" />
    <img v-if="isWebhook" src="/images/icon_trigger.png" class="trigger-icon" />
    <img :src="iconSrc" @error="handleImageError" class="node-icon" />
    <div class="node-label">{{ data.label }}</div>
    <Handle type="source" :position="Position.Right" class="handle-right" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { resolveNodeIcon } from '../../utils/iconResolver'

interface NodeData {
  label: string
  type: string
}

interface Props {
  data: NodeData
  id: string
}

const props = defineProps<Props>()
const setSelectedElement = inject<(val: any) => void>('setSelectedElement')

const isWebhook = props.data?.type === 'n8n-nodes-base.webhook'
const iconSrc = ref(resolveNodeIcon(props.data.type))

const handleClick = () => {
  setSelectedElement?.({ type: 'node', data: { id: props.id, data: props.data } })
}

watch(() => props.data.type, (newType) => {
  iconSrc.value = resolveNodeIcon(newType)
})

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target) {
    target.src = '/images/icon_default.png'
  }
}
</script>

<style scoped>
.custom-node {
  text-align: center;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: white;
  min-width: 120px;
  min-height: 90px;
  position: relative;
}
.dark .custom-node {
  background: #1f2937;
  border-color: #374151;
}
.handle-left,
.handle-right {
  width: 10px;
  height: 10px;
  background: #9ca3af;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.handle-left {
  left: -6px;
}
.handle-right {
  right: -6px;
}
.trigger-icon {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}
.node-icon {
  width: 32px;
  height: 32px;
}
.node-label {
  font-weight: 500;
  font-size: 14px;
  color: #1f2937;
  margin-top: 4px;
}
.dark .node-label {
  color: white;
}
</style> 