<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const themeStore = useThemeStore()
const layoutStyles = computed(() => themeStore.cssVariables)
</script>

<template>
  <div class="flex flex-col min-h-screen p-8 transition-colors duration-300" :style="layoutStyles">
    <NavbarComponent />

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
      <div class="mt-4 p-4 border rounded" :style="{ borderColor: 'var(--color-content-title)' }">
        <p>
          The border of this box and the H2 above demonstrate the specific override style (Content
          Title Color), which is independent of the global text color.
        </p>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>
