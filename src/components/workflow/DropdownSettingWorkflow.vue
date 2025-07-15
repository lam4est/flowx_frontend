<template>
  <div class="dropdown-container">
    <button @click="open = !open" class="dropdown-button">
      <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 12h.01M12 12h.01M18 12h.01" />
      </svg>
    </button>

    <transition name="fade">
      <div v-show="open" class="dropdown-menu">
        <ul>
          <li>
            <button class="dropdown-item">
              Duplicate
            </button>
          </li>
          <li>
            <button class="dropdown-item delete">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  text-align: left;
}
.dropdown-button {
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.dropdown-button:hover {
  background-color: #f3f4f6;
}
.dark .dropdown-button:hover {
  background-color: #374151;
}
.dropdown-menu {
  position: absolute;
  right: 0;
  z-index: 10;
  margin-top: 8px;
  width: 160px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.dark .dropdown-menu {
  background: #1f2937;
  border-color: #374151;
}
.dropdown-menu ul {
  padding: 4px 0;
}
.dropdown-menu li button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  font-size: 14px;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}
.dropdown-menu li button:hover {
  background-color: #f3f4f6;
}
.dark .dropdown-menu li button {
  color: #e5e7eb;
}
.dark .dropdown-menu li button:hover {
  background-color: #374151;
}
.dropdown-menu li button.delete {
  color: #dc2626;
}
.dropdown-menu li button.delete:hover {
  background-color: #fef2f2;
}
.dark .dropdown-menu li button.delete:hover {
  background-color: rgba(220, 38, 38, 0.3);
}
</style> 