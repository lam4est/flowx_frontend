<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">{{ isLogin ? 'Login' : 'Create Account' }}</h2>
      <p class="auth-subtitle">
        {{ isLogin ? 'Please sign in to your account' : 'Please sign up to create your workflow automation' }}
      </p>
      <form class="auth-form" @submit.prevent="onSubmit">
        <div v-if="!isLogin">
          <label class="auth-label" for="name">Full Name</label>
          <input
            type="text"
            id="name"
            class="auth-input"
            v-model="name"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label class="auth-label" for="email">Email</label>
          <input
            type="email"
            id="email"
            class="auth-input"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label class="auth-label" for="password">Password</label>
          <input
            type="password"
            id="password"
            class="auth-input"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button class="auth-button" type="submit">
          {{ isLogin ? 'Login' : 'Create Account' }}
        </button>
      </form>
      <p class="auth-footer">
        <span v-if="isLogin">
          Don't have an account?
          <span class="auth-login-link" @click="isLogin = false">Sign up here</span>
        </span>
        <span v-else>
          Already have an account?
          <span class="auth-login-link" @click="isLogin = true">Login here</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { apiService } from '../services/api'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')

const authStore = useAuthStore()

async function onSubmit() {
  if (isLogin.value) {
    if (!email.value || !password.value) {
      toast.error('Please enter both Email and Password!')
      return
    }
    if (!email.value.includes('@')) {
      toast.error('Invalid email!')
      return
    }
    try {
      const res = await apiService.login(email.value, password.value)
      if (res.data.access_token) {
        authStore.setToken(res.data.access_token)
        authStore.setUser(res.data.user)
        toast.success(`✅ Login Successful!\nEmail: ${res.data.user.email}`)
        router.push('/')
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error('Login failed: ' + err.response.data.message)
      } else {
        toast.error('Login failed!')
      }
    }
  } else {
    if (!name.value || !email.value || !password.value) {
      toast.error('Please enter your Name, Email, and Password!')
      return
    }
    if (!email.value.includes('@')) {
      toast.error('Invalid email!')
      return
    }
    if (password.value.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }
    try {
      const res = await apiService.register(name.value, email.value, password.value)
      toast.success(res.data.message); // Hiển thị message từ backend
      // Switch to login mode after successful registration
      isLogin.value = true
      name.value = ''
      email.value = ''
      password.value = ''
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Registration failed!');
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9fafb;
}

.auth-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: left;
  border: 1px solid #d1d5db;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.auth-subtitle {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 1.2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-label {
  font-weight: 400;
  font-size: 0.9rem;
  color: #374151;
  margin-bottom: 0.2rem;
  display: block;
}

.auth-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}

.auth-input:focus {
  border-color: #000000;
  background: white;
}

.auth-button {
  margin-top: 0.9rem;
  background: #6366f1;
  color: white;
  font-weight: 500;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.auth-button:hover {
  background: #4f46e5;
}

.auth-footer {
  margin-top: 1rem;
  font-size: 0.95rem;
  text-align: center;
  color: #6b7280;
}

.auth-login-link {
  color: #6366f1;
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}

.auth-login-link:hover {
  text-decoration: underline;
}
</style>
