<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const layoutStyles = computed(() => themeStore.cssVariables)
</script>

<template>
  <nav
    class="bg-gray-800 p-4"
    :style="{
      color: 'var(--color-text-global)',
      ...layoutStyles,
    }"
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-xl font-bold">Theme Customizer</div>
      <div class="space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-white">Page View</router-link>
        <router-link to="/customize" class="text-gray-300 hover:text-white"
          >Customization Panel</router-link
        >
      </div>
    </div>
  </nav>
</template>
