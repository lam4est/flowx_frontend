<script setup lang="ts">
import Layout from './components/Layout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { createWorkflowService } from './services/workflowService'

const route = useRoute()

createWorkflowService()

const showLayout = computed(() => {
  return route.path !== '/auth' && route.path !== '/'
})
</script>

<template>
  <Layout v-if="showLayout">
    <router-view />
  </Layout>
  <router-view v-else />
</template>

<style scoped>

</style>
