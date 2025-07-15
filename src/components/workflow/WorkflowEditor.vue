<template>
  <div class="workflow-editor">
    <!-- Navbar -->
    <div class="workflow-navbar">
      <div class="navbar-left">
        <button @click="goBack" class="back-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <input v-model="workflowName" @blur="saveWorkflow" @keydown.enter.prevent="saveWorkflow"
          class="workflow-name-input" />
      </div>
      <div class="navbar-right">
        <button @click="saveWorkflow" class="save-button">Save Workflow</button>
        <DropdownSetting />
      </div>
    </div>

    <!-- VueFlow Canvas -->
    <div class="workflow-canvas">
      <VueFlow v-model:nodes="nodes" v-model:edges="edges" :node-types="nodeTypes" :connectable="true"
        :edge-types="edgeTypes" :elementsSelectable="true" :nodesConnectable="true" :select-nodes-on-click="true"
        :connection-line-options="connectionLineOptions" :default-viewport="{ zoom: 1 }" :min-zoom="0.2" :max-zoom="2"
        fit-view-on-init @connect="onConnect" @pane-click="deselect">
        <MiniMap pannable zoomable node-color="#3b82f6" class="bg-white dark:bg-gray-800" />
        <Controls />
        <Background color="#aaa" :gap="12" />
      </VueFlow>

      <!-- Nút Add Node -->
      <button @click="handleAddNode" class="add-node-button">
        <svg class="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <!-- Sidebar: Node Details -->
      <transition name="slide">
        <div v-if="selectedElement?.type === 'node' && selectedElement.data?.data" class="node-details">
          <h4>Node Details</h4>
          <div class="form-group">
            <label class="form-label">Label:</label>
            <input v-model="selectedElement.data.data.label" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Type:</label>
            <p class="form-text">{{ selectedElement.data.data.type }}</p>
          </div>
          <div class="form-group">
            <label class="form-label">ID:</label>
            <p class="form-text">{{ selectedElement.data.id }}</p>
          </div>
        </div>
      </transition>

      <transition name="slide">
        <div v-if="showNodeSelector" class="node-selector">
          <!-- Lớp overlay mờ để click ra ngoài -->
          <div class="node-selector-overlay" @click.self="closeSelector">
            <!-- Sidebar nội dung -->
            <div class="node-selector-sidebar">
              <div class="node-selector-header">
                <h4 class="node-selector-title">What happens next?</h4>
                <input v-model="searchQuery" placeholder="Search nodes..." class="node-search" />
              </div>

              <div class="node-list">
                <div v-for="node in availableNodes" :key="node.id" @click="onClickNodeType(node.type)"
                  class="node-item">
                  <div class="node-item-info">
                    <img :src="resolveNodeIcon(node.type)" @error="handleImageError"
                      class="node-item-icon" />
                    <div>
                      <p class="node-item-name">{{ node.name }}</p>
                    </div>
                  </div>
                  <svg class="node-item-arrow" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, markRaw, provide } from 'vue'
import { useWorkflowService } from '../../services/workflowService'
import { useRoute, useRouter } from 'vue-router'
import { VueFlow, MarkerType, BezierEdge, ConnectionLineType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import NodeRenderer from './NodeRenderer.vue'
import DropdownSetting from './DropdownSettingWorkflow.vue'
import { resolveNodeIcon } from '../../utils/iconResolver'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'

const route = useRoute()
const router = useRouter()
const { addNodeByType, getWorkflow, updateWorkflow } = useWorkflowService()
const nodes = ref<any[]>([])
const edges = ref<any[]>([])
const workflowName = ref('')
const selectedElement = ref<any>(null)
const showNodeSelector = ref(false)
const searchQuery = ref('')

// Lấy danh sách node hiện có trong workflow để hiển thị selector
const availableNodes = computed(() => nodes.value)

const closeSelector = () => {
  showNodeSelector.value = false
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target) {
    target.src = '/images/icon_default.png'
  }
}

provide('setSelectedElement', (val: any) => (selectedElement.value = val))

const connectionLineOptions = {
  type: ConnectionLineType.Bezier,
  style: { stroke: '#3b82f6', strokeWidth: 2 },
}

const edgeTypes = {
  bezier: markRaw(BezierEdge) as any,
}

const nodeTypes = {
  custom: markRaw(NodeRenderer) as any,
}

const deselect = () => {
  selectedElement.value = null
}

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement.value?.type === 'node') {
    nodes.value = nodes.value.filter((n) => n.id !== selectedElement.value.data.id)
    edges.value = edges.value.filter(
      (e) => e.source !== selectedElement.value.data.id && e.target !== selectedElement.value.data.id
    )
    selectedElement.value = null
  }
}

const goBack = () => {
  router.back()
}

const onConnect = (params: any) => {
  edges.value.push({
    ...params,
    id: `e-${params.source}-${params.target}-${Date.now()}`,
    type: 'bezier',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#3b82f6',
    },
  })
}

const handleAddNode = () => {
  showNodeSelector.value = true
}

const onClickNodeType = async (type: string) => {
  const newNode = await addNodeByType(type)
  if (newNode) {
    nodes.value.push(newNode)
    showNodeSelector.value = false
    console.log('Node added:', newNode)
  }
}

const loadWorkflow = async () => {
  try {
    const data = await getWorkflow(route.params.id as string)
    workflowName.value = data.name || 'Untitled Workflow'

    const nameToIdMap: { [key: string]: string } = {}
    data.nodes.forEach((n: any) => (nameToIdMap[n.name] = n.id))

    nodes.value = data.nodes.map((n: any) => ({
      id: n.id,
      position: { x: n.position[0], y: n.position[1] },
      data: { label: n.name, type: n.type || 'default' },
      type: 'custom',
    }))

    edges.value = []
    Object.entries(data.connections).forEach(([sourceName, connObj]: [string, any]) => {
      const sourceId = nameToIdMap[sourceName]
      if (!sourceId || !connObj.main) return
      connObj.main[0]?.forEach((conn: any, index: number) => {
        const targetId = nameToIdMap[conn.node]
        if (!targetId) return
        edges.value.push({
          id: `e-${sourceId}-${targetId}-${index}`,
          source: sourceId,
          target: targetId,
          type: 'bezier',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#9ca3af',
          },
        })
      })
    })
  } catch (err) {
    console.error('Error loading workflow:', err)
  }
}

const saveWorkflow = async () => {
  const idToLabelMap: { [key: string]: string } = {}
  nodes.value.forEach((n) => (idToLabelMap[n.id] = n.data.label))

  const workflow: any = {
    name: workflowName.value.trim() || 'Untitled Workflow',
    nodes: nodes.value.map((n) => ({
      id: n.id,
      name: n.data.label,
      position: [n.position.x, n.position.y],
      type: n.data.type || 'default',
    })),
    connections: {},
  }

  edges.value.forEach((edge) => {
    const sourceLabel = idToLabelMap[edge.source]
    const targetLabel = idToLabelMap[edge.target]
    if (!sourceLabel || !targetLabel) return

    if (!workflow.connections[sourceLabel]) {
      workflow.connections[sourceLabel] = { main: [[]] }
    }

    workflow.connections[sourceLabel].main[0].push({
      node: targetLabel,
      type: 'main',
      index: 0,
    })
  })

  await updateWorkflow(route.params.id as string, workflow)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  loadWorkflow()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.workflow-editor {
  width: 100%;
  height: 100vh;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.dark .workflow-editor {
  background: #111827;
}
.workflow-navbar {
  width: 100%;
  background: white;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dark .workflow-navbar {
  background: #1f2937;
  border-color: #374151;
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.back-button {
  color: #6b7280;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.back-button:hover {
  color: #000;
  background-color: #f3f4f6;
}
.dark .back-button:hover {
  color: white;
  background-color: #374151;
}
.workflow-name-input {
  background: transparent;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}
.workflow-name-input:focus {
  border-color: #3b82f6;
}
.dark .workflow-name-input {
  color: white;
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.save-button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.save-button:hover {
  background: #2563eb;
}
.workflow-canvas {
  flex: 1;
  position: relative;
}
.add-node-button {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  transition: all 0.2s;
}
.add-node-button:hover {
  background-color: #f9fafb;
}
.dark .add-node-button {
  background: #1f2937;
  border-color: #374151;
}
.dark .add-node-button:hover {
  background-color: #374151;
}
.node-details {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 288px;
  background: white;
  padding: 20px;
  box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  border-left: 1px solid #e5e7eb;
}
.dark .node-details {
  background: #1f2937;
  border-color: #374151;
}
.node-details h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
}
.dark .node-details h4 {
  color: white;
}
.form-group {
  margin-bottom: 12px;
}
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}
.dark .form-label {
  color: #d1d5db;
}
.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #111827;
  font-size: 14px;
}
.dark .form-input {
  background: #374151;
  border-color: #4b5563;
  color: white;
}
.form-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}
.dark .form-text {
  color: #9ca3af;
}
.node-selector {
  position: fixed;
  inset: 0;
  z-index: 50;
}
.node-selector-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
}
.node-selector-sidebar {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 320px;
  background: white;
  box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}
.dark .node-selector-sidebar {
  background: #1f2937;
  border-color: #374151;
}
.node-selector-header {
  padding: 24px 24px 12px;
}
.node-selector-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111827;
}
.dark .node-selector-title {
  color: white;
}
.node-search {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #111827;
  font-size: 14px;
}
.dark .node-search {
  background: #374151;
  border-color: #4b5563;
  color: white;
}
.node-list {
  flex: 1;
  overflow-y: auto;
}
.node-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.node-item:hover {
  background-color: #f3f4f6;
}
.dark .node-item:hover {
  background-color: #374151;
}
.node-item-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.node-item-icon {
  width: 20px;
  height: 20px;
}
.node-item-name {
  font-weight: 500;
  color: #111827;
}
.dark .node-item-name {
  color: white;
}
.node-item-arrow {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 