<script setup lang="ts">
import Layout from './components/Layout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Chỉ hiển thị Layout cho các trang cần sidebar/navbar
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
