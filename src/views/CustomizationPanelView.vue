<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import ThemeControl from '@/components/ThemeControl.vue'
import { storeToRefs } from 'pinia'
import PagePreview from '@/components/PagePreview.vue'

const themeStore = useThemeStore()
const { globalBackground, globalText, sectionColor, originalState } = storeToRefs(themeStore)

const updateTheme = (key: keyof typeof themeStore.$state, value: string) => {
  themeStore.setThemeValue(key, value)
}

const hasChanges = computed(() => {
  if (!originalState.value) return false
  return (
    globalBackground.value !== originalState.value.globalBackground ||
    globalText.value !== originalState.value.globalText ||
    sectionColor.value !== originalState.value.sectionColor
  )
})

const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
  if (hasChanges.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}

onMounted(() => window.addEventListener('beforeunload', beforeUnloadHandler))
onUnmounted(() => window.removeEventListener('beforeunload', beforeUnloadHandler))

onBeforeRouteLeave(() => {
  if (hasChanges.value) {
    const answer = window.confirm(
      'You have unsaved changes. Are you sure you want to leave? Your changes will be discarded.',
    )
    if (!answer) {
      // User clicked 'Cancel', so we block the navigation.
      return false
    }
    themeStore.cancelChanges()
  }
})
</script>

<template>
  <div class="p-4 bg-gray-100">
    <PagePreview class="mb-6" />

    <h2 class="text-2xl font-extrabold text-indigo-700 border-b pb-2 px-">
      Theme Customizer Panel
    </h2>
    <p class="text-sm text-gray-600 mb-2">
      Use the controls below to customize the theme. Changes are previewed instantly.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
          label="Background Color"
          :modelValue="sectionColor"
          @update:modelValue="updateTheme('sectionColor', $event)"
        />
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-4">
      <button
        @click="themeStore.cancelChanges()"
        :disabled="!hasChanges"
        class="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        @click="themeStore.saveTheme()"
        :disabled="!hasChanges"
        class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  </div>
</template>
