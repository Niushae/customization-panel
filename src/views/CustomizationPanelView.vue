<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import ThemeControl from '@/components/ThemeControl.vue'
import { storeToRefs } from 'pinia'
import PagePreview from '@/components/PagePreview.vue'

const themeStore = useThemeStore()
const { globalBackground, globalText, sectionColor } = storeToRefs(themeStore)

const updateTheme = (key: keyof typeof themeStore.$state, value: string) => {
  themeStore.setThemeValue(key, value)
}
</script>

<template>
  <div
    class="p-4 space-y-6 bg-gray-100 shadow-xl border-l-4 border-indigo-600 h-full overflow-y-auto"
  >
    <PagePreview class="mb-6" />

    <h2 class="text-2xl font-extrabold text-indigo-700 border-b pb-2">Theme Customizer Panel</h2>
    <p class="text-sm text-gray-600">
      Changes are applied instantly and saved automatically via LocalStorage.
    </p>

    <div class="space-y-4 p-3 border rounded-lg bg-white shadow-sm">
      <h3 class="font-bold text-lg text-gray-700 border-b pb-1">Global Styles</h3>

      <ThemeControl
        label="Global Background"
        :modelValue="globalBackground"
        @update:modelValue="updateTheme('globalBackground', $event)"
      />

      <ThemeControl
        label="Global Text Color"
        :modelValue="globalText"
        @update:modelValue="updateTheme('globalText', $event)"
      />
    </div>

    <div class="space-y-4 p-3 border rounded-lg bg-white shadow-sm">
      <h3 class="font-bold text-lg text-gray-700 border-b pb-1">Content Override</h3>

      <ThemeControl
        label="Content Title Color"
        :modelValue="sectionColor"
        @update:modelValue="updateTheme('sectionColor', $event)"
      />
    </div>
  </div>
</template>
