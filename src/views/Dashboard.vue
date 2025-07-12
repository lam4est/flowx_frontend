<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Welcome to your FlowX automation dashboard</p>
      </div>

      <div class="dashboard-actions">
        <button class="btn btn-secondary">
          <svg fill="currentColor" viewBox="0 0 20 20" width="16" height="16">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zM5 5a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" clip-rule="evenodd" />
          </svg>
          Filter
        </button>
        <button class="btn btn-primary" @click="showCreateModal = true">
          <svg fill="currentColor" viewBox="0 0 20 20" width="16" height="16">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create Workflow
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Total Workflows</h3>
          <div class="card-icon">
            <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-number">24</div>
          <div class="stat-change positive">+12% from last month</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Active Automations</h3>
          <div class="card-icon">
            <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-number">18</div>
          <div class="stat-change positive">+8% from last month</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Executions Today</h3>
          <div class="card-icon">
            <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-number">1,247</div>
          <div class="stat-change positive">+23% from yesterday</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Success Rate</h3>
          <div class="card-icon">
            <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-number">98.5%</div>
          <div class="stat-change positive">+0.5% from last week</div>
        </div>
      </div>
    </div>

    <!-- Recent Workflows -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Recent Workflows</h3>
        <router-link to="/workflows" class="btn btn-secondary">
          View All
        </router-link>
      </div>
      
      <div class="workflow-list">
        <div v-for="workflow in recentWorkflows" :key="workflow.id" class="workflow-item">
          <div class="workflow-info">
            <h4 class="workflow-name">{{ workflow.name }}</h4>
            <p class="workflow-description">{{ workflow.description }}</p>
            <div class="workflow-meta">
              <span class="workflow-status" :class="workflow.status">{{ workflow.status }}</span>
              <span class="workflow-date">{{ workflow.lastExecuted }}</span>
            </div>
          </div>
          <div class="workflow-actions">
            <button class="btn btn-secondary btn-sm">Edit</button>
            <button class="btn btn-primary btn-sm">Run</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCreateModal = ref(false)

const recentWorkflows = ref([
  {
    id: 1,
    name: 'Email Notification System',
    description: 'Automatically sends email notifications for new orders',
    status: 'active',
    lastExecuted: '2 hours ago'
  },
  {
    id: 2,
    name: 'Data Backup Process',
    description: 'Daily backup of critical data to cloud storage',
    status: 'active',
    lastExecuted: '1 day ago'
  },
  {
    id: 3,
    name: 'Customer Onboarding',
    description: 'Automated welcome emails and account setup',
    status: 'paused',
    lastExecuted: '3 days ago'
  },
  {
    id: 4,
    name: 'Inventory Sync',
    description: 'Synchronizes inventory levels across platforms',
    status: 'active',
    lastExecuted: '5 hours ago'
  }
])
</script>

<style scoped>
.dashboard-subtitle {
  color: #6b7280;
  margin-top: 0.25rem;
}

.card-icon {
  color: #3b82f6;
}

.card-content {
  margin-top: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-change {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.stat-change.positive {
  color: #059669;
}

.workflow-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.workflow-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
}

.workflow-info {
  flex: 1;
}

.workflow-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.workflow-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.workflow-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.workflow-status {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.workflow-status.active {
  background-color: #d1fae5;
  color: #059669;
}

.workflow-status.paused {
  background-color: #fef3c7;
  color: #d97706;
}

.workflow-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.workflow-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .workflow-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .workflow-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 