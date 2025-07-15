import { ref, inject, provide } from 'vue'
import { toast } from 'vue3-toastify'
import api from '../utils/axios'

const WorkflowServiceSymbol = Symbol('WorkflowService')

export interface WorkflowService {
  // State
  workflows: any
  availableNodes: any
  
  // API Methods
  getAllWorkflows: () => Promise<void>
  getWorkflow: (id: string) => Promise<any>
  createWorkflow: (name: string) => Promise<any>
  createWorkflowFromTemplate: (name: string, templateName: string) => Promise<any>
  updateWorkflow: (id: string, data: any) => Promise<void>
  deleteWorkflow: (workflowId: string) => Promise<void>
  toggleWorkflowActive: (workflowId: string, newStatus: boolean) => Promise<void>
  
  // Node Methods
  fetchAllNodes: () => Promise<void>
  addNodeByType: (type: string) => Promise<any>
}

export function createWorkflowService() {
  const workflows = ref<any[]>([])
  const availableNodes = ref<any[]>([])

  // API Methods
  const getAllWorkflows = async () => {
    try {
      const { data } = await api.get('/workflows')
      if (data.success) workflows.value = data.workflows
    } catch (err) {
      console.error('Error fetching workflows:', err)
      toast.error('Cannot load workflows list')
    }
  }

  const getWorkflow = async (id: string) => {
    try {
      const { data } = await api.get(`/workflows/${id}`)
      return data
    } catch (err) {
      console.error('Error fetching workflow:', err)
      toast.error('Cannot load workflow')
      throw err
    }
  }

  const createWorkflow = async (name: string) => {
    try {
      const { data } = await api.post('/workflows', { name })

      if (!data.success) throw new Error(data.message || 'Creation failed')
      toast.success('Workflow created successfully')
      await getAllWorkflows()
      return data.workflow
    } catch (err: any) {
      toast.error(err.message || 'Error creating workflow')
      throw err
    }
  }

  const createWorkflowFromTemplate = async (name: string, templateName: string) => {
    try {
      const { data } = await api.post(`/workflows/template/${templateName}`, { name })
      if (!data.success) throw new Error(data.message || 'Creation failed')
      toast.success('Created from template successfully')
      await getAllWorkflows()
      return data.workflow
    } catch (err: any) {
      toast.error(err.message || 'Error creating from template')
      throw err
    }
  }

  const updateWorkflow = async (id: string, workflowData: any) => {
    try {
      await api.put(`/workflows/${id}`, workflowData)
      toast.success('Workflow updated successfully')
    } catch (err) {
      console.error('Error updating workflow:', err)
      toast.error('Failed to update workflow')
      throw err
    }
  }

  const deleteWorkflow = async (workflowId: string) => {
    try {
      const res = await api.delete(`/workflows/${workflowId}`)
      if (res.status === 200) {
        toast.success('Workflow deleted successfully')
        await getAllWorkflows()
      }
    } catch (err) {
      toast.error('Failed to delete workflow')
      console.error(err)
    }
  }

  const toggleWorkflowActive = async (workflowId: string, newStatus: boolean) => {
    try {
      const res = await api.post(`/workflows/${workflowId}/toggle-active`, { active: newStatus })
      if (res.data.success) {
        toast.success('Status updated successfully')
        await getAllWorkflows()
      } else {
        toast.error(res.data.message || 'Failed to change status')
      }
    } catch (err) {
      toast.error('Workflow must have at least 1 node to activate')
    }
  }

  // Node Methods
  const fetchAllNodes = async () => {
    try {
      const { data } = await api.get('/nodes')
      availableNodes.value = data
    } catch (err) {
      console.error('Error fetching nodes:', err)
      toast.error('Cannot load nodes list')
    }
  }

  const addNodeByType = async (type: string) => {
    try {
      const res = await api.get(`/nodes/${type}`)
      const node = res.data

      const newNode = {
        id: `node-${Date.now()}`,
        position: { x: 100, y: 100 },
        data: {
          label: node.name,
          type: node.type,
          parameters: node.parameters,
          credentials: node.credentials,
          webhookId: node.webhookId,
        },
        type: 'custom',
      }

      return newNode
    } catch (err) {
      console.error('Error adding node:', err)
      toast.error('Cannot add node')
      return null
    }
  }

  const service: WorkflowService = {
    workflows,
    availableNodes,
    getAllWorkflows,
    getWorkflow,
    createWorkflow,
    createWorkflowFromTemplate,
    updateWorkflow,
    deleteWorkflow,
    toggleWorkflowActive,
    fetchAllNodes,
    addNodeByType
  }

  provide(WorkflowServiceSymbol, service)
}

export function useWorkflowService(): WorkflowService {
  const service = inject(WorkflowServiceSymbol) as WorkflowService
  if (!service) throw new Error('WorkflowService not provided')
  return service
} 