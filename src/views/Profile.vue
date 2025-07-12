<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Profile</h1>
        <p class="dashboard-subtitle">Manage your personal information</p>
      </div>
    </div>
    
    <div class="profile-grid">
      <!-- Profile Information -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Profile Information</h3>
        </div>
        <div class="profile-info">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              <svg fill="currentColor" viewBox="0 0 20 20" width="48" height="48">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <button class="btn btn-secondary btn-sm">Change Avatar</button>
          </div>
          
          <div class="profile-details">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" v-model="profile.name" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" v-model="profile.email" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" v-model="profile.phone" />
            </div>
            <div class="form-group">
              <label class="form-label">Bio</label>
              <textarea class="form-input" v-model="profile.bio" rows="3"></textarea>
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>

      <!-- Account Statistics -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Account Statistics</h3>
        </div>
        <div class="stats-list">
          <div class="stat-item">
            <div class="stat-label">Member Since</div>
            <div class="stat-value">{{ profile.memberSince }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Total Workflows</div>
            <div class="stat-value">{{ stats.totalWorkflows }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Active Automations</div>
            <div class="stat-value">{{ stats.activeAutomations }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Success Rate</div>
            <div class="stat-value">{{ stats.successRate }}%</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Recent Activity</h3>
        </div>
        <div class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" width="16" height="16">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Automation enthusiast and workflow expert with 5+ years of experience in process optimization.',
  memberSince: 'January 2023'
})

const stats = ref({
  totalWorkflows: 24,
  activeAutomations: 18,
  successRate: 98.5
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Created new workflow "Email Notification System"',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Updated automation "Data Backup Process"',
    time: '1 day ago'
  },
  {
    id: 3,
    title: 'Workflow "Customer Onboarding" completed successfully',
    time: '3 days ago'
  },
  {
    id: 4,
    title: 'Added new integration "Slack"',
    time: '1 week ago'
  }
])
</script>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.profile-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.profile-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-value {
  font-weight: 600;
  color: #1f2937;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.activity-icon {
  width: 2rem;
  height: 2rem;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #059669;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style> 