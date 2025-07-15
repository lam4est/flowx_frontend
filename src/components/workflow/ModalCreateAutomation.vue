<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <h2 class="modal-title">Create an automation</h2>
        <button @click="close" class="modal-close">&times;</button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <p class="modal-description">
          Create an automation from scratch or use one of our pre-built automations.
        </p>

        <!-- Templates -->
        <div class="templates-grid">
          <AutomationCard v-for="template in templates" :key="template.title" :icon="template.icon"
            :title="template.title" :description="template.description" :templateName="template.templateName"
            @click="() => createFromTemplate(template.templateName, template.title)" />
        </div>

        <!-- Create from scratch -->
        <div class="create-scratch">
          <button @click="createFromScratch">
            Create from scratch
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutomationCard from './AutomationCard.vue'
import { defineEmits } from 'vue'
import { useWorkflowService } from '../../services/workflowService'

const emit = defineEmits<{
  close: []
  create: [workflow: any]
}>()

const { createWorkflow, createWorkflowFromTemplate } = useWorkflowService()

const close = () => emit('close')

const createFromScratch = async () => {
  try {
    const workflow = await createWorkflow('New Automation')
    emit('create', workflow)
  } catch (err) {
    console.error('Error creating workflow:', err)
  } finally {
    emit('close')
  }
}

const createFromTemplate = async (templateName: string, title: string) => {
  try {
    const workflow = await createWorkflowFromTemplate(title, templateName)
    emit('create', workflow)
  } catch (err) {
    console.error('Error creating workflow from template:', err)
  } finally {
    emit('close')
  }
}

const templates = [
  {
    title: 'Abandoned cart',
    description: 'Send a message after a contact abandons a cart.',
    icon: '🛒',
    templateName: 'abandoned-cart',
  },
  {
    title: 'Product purchase',
    description: 'Send a message when a product is purchased on your website.',
    icon: '🛍️',
    templateName: 'product-purchase',
  },
  {
    title: 'Welcome message',
    description: 'Send a welcome message after a subscriber joins your list.',
    icon: '📬',
    templateName: 'welcome-message',
  },
  {
    title: 'Marketing activity',
    description: 'Send messages based on whether contacts open or click an email campaign.',
    icon: '📈',
    templateName: 'marketing-activity',
  },
  {
    title: 'Anniversary date',
    description: 'Send a series of messages based on a special event or birthday.',
    icon: '🎉',
    templateName: 'anniversary-date',
  },
]
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-container {
  background: white;
  width: 100%;
  max-width: 896px;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.dark .modal-container {
  background: #111827;
}
.modal-header {
  background: #dcfce7;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.modal-close {
  color: #6b7280;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #111827;
}
.modal-body {
  padding: 24px;
}
.modal-description {
  color: #374151;
  margin-bottom: 24px;
}
.dark .modal-description {
  color: #d1d5db;
}
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}
.create-scratch {
  text-align: right;
}
.create-scratch button {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background: white;
  cursor: pointer;
  transition: background-color 0.2s;
}
.create-scratch button:hover {
  background-color: #f9fafb;
}
.dark .create-scratch button {
  background: #1f2937;
  border-color: #374151;
  color: white;
}
.dark .create-scratch button:hover {
  background-color: #374151;
}
</style> 