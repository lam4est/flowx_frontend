<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Workflow Lists</h3>
    </div>
    <div class="table-container">
      <div class="table-wrapper">
        <table class="workflow-table">
          <thead class="table-header">
            <tr>
              <th class="table-header-cell">Workflow</th>
              <th class="table-header-cell text-center">Created At</th>
              <th class="table-header-cell text-center">Hit</th>
              <th class="table-header-cell text-center">Status</th>
              <th class="table-header-cell text-center">Action</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr
              v-for="workflow in workflows"
              :key="workflow.id"
              class="table-row"
              @click="goToWorkflow(workflow.id)"
            >
              <td class="table-cell">
                <div class="workflow-info">
                  <div class="workflow-icon">
                    <svg width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#0E2439" cx="18" cy="18" r="18" />
                      <path
                        d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z"
                        fill="#E6ECF4"
                      />
                    </svg>
                  </div>
                  <div class="workflow-name">{{ workflow.name }}</div>
                </div>
              </td>
              <td class="table-cell text-center">
                {{ new Date(workflow.createdAt).toLocaleDateString() }}
              </td>
              <td class="table-cell text-center">
                {{ workflow.hitCount || 0 }}
              </td>
              <td class="table-cell text-center">
                <span :class="workflow.active ? 'status-active' : 'status-inactive'">
                  {{ workflow.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="table-cell text-center">
                <span class="action-link">View</span>
              </td>
            </tr>

            <tr v-if="workflows.length === 0">
              <td colspan="5" class="empty-state">
                Không có workflow nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../services/api'

interface Workflow {
  id: string
  name: string
  createdAt: string
  hitCount?: number
  active: boolean
}

const router = useRouter()
const workflows = ref<Workflow[]>([])

onMounted(async () => {
  try {
    const response = await apiService.getWorkflows()
    workflows.value = response.data.workflows || []
  } catch (error) {
    console.error('Error fetching workflows:', error)
  }
})

const goToWorkflow = (workflowId: string) => {
  if (workflowId) {
    router.push(`/workflows/${workflowId}`)
  } else {
    console.warn('Không tìm thấy workflow ID')
  }
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.table-wrapper {
  min-width: 100%;
}

.workflow-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.table-header-cell {
  padding: 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.table-header-cell.text-center {
  text-align: center;
}

.table-body {
  font-size: 0.875rem;
  font-weight: 500;
}

.table-row {
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f9fafb;
}

.table-cell {
  padding: 0.75rem;
  vertical-align: middle;
}

.table-cell.text-center {
  text-align: center;
}

.workflow-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.workflow-icon {
  flex-shrink: 0;
}

.workflow-name {
  color: #1f2937;
  font-weight: 500;
}

.status-active {
  color: #059669;
  font-weight: 500;
}

.status-inactive {
  color: #dc2626;
  font-weight: 500;
}

.action-link {
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
}

.action-link:hover {
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
}

@media (max-width: 768px) {
  .table-container {
    font-size: 0.75rem;
  }
  
  .table-header-cell,
  .table-cell {
    padding: 0.5rem;
  }
  
  .workflow-info {
    gap: 0.5rem;
  }
  
  .workflow-icon svg {
    width: 24px;
    height: 24px;
  }
}
</style> 