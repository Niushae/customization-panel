<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const layoutStyles = computed(() => themeStore.cssVariables)
</script>

<template>
  <footer
    class="bg-gray-800 p-4 mt-8"
    :style="{
      color: 'var(--color-text-global)',
      ...layoutStyles,
    }"
  >
    <div class="container mx-auto text-center text-gray-300">
      &copy; 2025 Customization Panel. All rights reserved.
    </div>
  </footer>
</template>
