import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string, [key: string]: any },
    token: localStorage.getItem('access_token') || null,
  }),
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
      localStorage.removeItem('access_token')
    }
  }
}) 