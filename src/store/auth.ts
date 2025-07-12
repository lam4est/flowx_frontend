import { defineStore } from 'pinia'
import { getStoredToken, clearStoredToken } from '../utils/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string, [key: string]: any },
    token: getStoredToken(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('access_token', token)
    },
    logout() {
      this.user = null
      this.token = null
      clearStoredToken()
      // Redirect to auth page after logout
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth'
      }
    }
  }
}) 