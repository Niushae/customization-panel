<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const layoutStyles = computed(() => themeStore.cssVariables)
</script>

<template>
  <div class="flex flex-col min-h-screen p-8 transition-colors duration-300" :style="layoutStyles">
    <header
      class="p-6 mb-8 shadow-md rounded-lg transition-colors duration-300"
      :style="{
        backgroundColor: 'var(--color-bg-global)',
        color: 'var(--color-text-global)',
      }"
    >
      <h1 class="text-3xl font-bold">Custom Theme Preview</h1>
      <p>This entire page responds to the global theme styles.</p>
    </header>

    <main
      class="flex-grow p-8 mb-8 rounded-lg shadow-xl border-t-4 border-indigo-300 transition-colors duration-300"
      :style="{
        backgroundColor: 'var(--color-bg-global)',
        color: 'var(--color-text-global)',
      }"
    >
      <h2
        class="text-2xl font-semibold mb-4 border-b pb-2 transition-colors duration-300"
        :style="{ color: 'var(--color-content-title)' }"
      >
        Content Section Title (Override Style)
      </h2>
      <p class="text-lg">This text follows the global text color ({{ themeStore.globalText }}).</p>
      <section class="mt-4 p-4 border rounded" :style="{ backgroundColor: 'var(--color-section)' }">
        <p>
          This background color demonstrate the specific override style (Background Color), which is
          independent of the global text color.
        </p>
      </section>
    </main>
  </div>
</template>
