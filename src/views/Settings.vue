<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Settings</h1>
        <p class="dashboard-subtitle">Manage your account and preferences</p>
      </div>
    </div>
    
    <div class="settings-grid">
      <!-- Profile Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Profile Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" v-model="profile.name" placeholder="Enter your full name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" v-model="profile.email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" v-model="profile.company" placeholder="Enter your company" />
          </div>
          <button class="btn btn-primary" :disabled="!profileChanged" @click="saveProfile">Save Changes</button>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Notification Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label checkbox-label">
              <input type="checkbox" v-model="notifications.email" />
              <span>Email Notifications</span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label checkbox-label">
              <input type="checkbox" v-model="notifications.sms" />
              <span>SMS Notifications</span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label checkbox-label">
              <input type="checkbox" v-model="notifications.push" />
              <span>Push Notifications</span>
            </label>
          </div>
          <button class="btn btn-primary" :disabled="!notificationChanged" @click="saveNotifications">Save Changes</button>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Security Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" class="form-input" v-model="security.currentPassword" placeholder="Enter current password" />
          </div>
          <div class="form-group">
            <label class="form-label">New Password</label>
            <input type="password" class="form-input" v-model="security.newPassword" placeholder="Enter new password" />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm New Password</label>
            <input type="password" class="form-input" v-model="security.confirmPassword" placeholder="Confirm new password" />
          </div>
          <button class="btn btn-primary" :disabled="!securityChanged" @click="changePassword">Change Password</button>
        </div>
      </div>

      <!-- API Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">API Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label">API Key</label>
            <div class="api-key-display">
              <input type="text" class="form-input" :value="apiKey" readonly />
              <button class="btn btn-secondary btn-sm">Copy</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Webhook URL</label>
            <input type="url" class="form-input" v-model="webhookUrl" placeholder="Enter webhook URL" />
          </div>
          <button class="btn btn-primary" :disabled="!webhookChanged" @click="saveWebhook">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Original data for comparison
const originalProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  company: 'FlowX Inc.'
}

const originalNotifications = {
  email: true,
  sms: false,
  push: true
}

const originalWebhookUrl = ref('https://api.example.com/webhook')

const originalSecurity = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

// Reactive data
const profile = ref({ ...originalProfile })
const notifications = ref({ ...originalNotifications })
const security = ref({ ...originalSecurity })
const webhookUrl = ref(originalWebhookUrl.value)
const apiKey = ref('sk-1234567890abcdef')

// Computed properties to check if data has changed
const profileChanged = computed(() => {
  return JSON.stringify(profile.value) !== JSON.stringify(originalProfile)
})

const notificationChanged = computed(() => {
  return JSON.stringify(notifications.value) !== JSON.stringify(originalNotifications)
})

const webhookChanged = computed(() => {
  return webhookUrl.value !== originalWebhookUrl.value
})

const securityChanged = computed(() => {
  return security.value.currentPassword !== '' || 
         security.value.newPassword !== '' || 
         security.value.confirmPassword !== ''
})

// Save functions
const saveProfile = () => {
  console.log('Saving profile:', profile.value)
  Object.assign(originalProfile, profile.value)
}

const saveNotifications = () => {
  console.log('Saving notifications:', notifications.value)
  Object.assign(originalNotifications, notifications.value)
}

const changePassword = () => {
  console.log('Changing password:', security.value)
  // Reset security fields after password change
  security.value = { ...originalSecurity }
}

const saveWebhook = () => {
  console.log('Saving webhook:', webhookUrl.value)
  // Update original value
  originalWebhookUrl.value = webhookUrl.value
}
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.settings-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
}

.settings-form .btn {
  margin-top: auto;
  align-self: flex-end;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #9ca3af !important;
}

.btn:disabled:hover {
  background-color: #9ca3af !important;
  transform: none;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
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

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

.api-key-display {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.api-key-display .form-input {
  flex: 1;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 