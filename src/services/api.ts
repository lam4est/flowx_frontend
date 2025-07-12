import api from '../utils/axios'

export const apiService = {
  // Auth endpoints
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/users', { name, email, password }),

  // User endpoints
  getUsers: () => api.get('/users'),
  getUser: (id: number) => api.get(`/users/${id}`),
  updateUser: (id: number, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/users/${id}`),

  // Workflow endpoints
  getWorkflows: () => api.get('/workflows'),
  getWorkflow: (id: number) => api.get(`/workflows/${id}`),
  createWorkflow: (data: any) => api.post('/workflows', data),
  deleteWorkflow: (id: number) => api.delete(`/workflows/${id}`),
  createFromTemplate: (templateName: string, data: any) => 
    api.post(`/workflows/template/${templateName}`, data),
} 