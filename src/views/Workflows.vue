<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Workflows</h1>
        <p class="dashboard-subtitle">Manage your automation workflows</p>
      </div>
      
      <div class="dashboard-actions">
        <button class="btn btn-primary" @click="showCreateModal = true">
          <svg fill="currentColor" viewBox="0 0 20 20" width="16" height="16">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create Workflow
        </button>
      </div>
    </div>
    
    <!-- Workflow Table -->
    <WorkflowTable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WorkflowTable from '../components/WorkflowTable.vue'

const showCreateModal = ref(false)
</script> 