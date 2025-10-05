<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex items-center justify-between p-2 bg-gray-50 rounded-md">
    <label class="text-sm font-medium text-gray-700 w-1/2">{{ props.label }}</label>
    <input
      type="color"
      :value="props.modelValue"
      @input="handleChange"
      class="w-1/2 h-8 rounded-md border-gray-300 shadow-sm cursor-pointer"
      title="Select color"
    />
  </div>
</template>
