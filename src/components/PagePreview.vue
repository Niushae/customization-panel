<script setup lang="ts">
import PageView from '@/views/PageView.vue'
</script>

<template>
  <div
    class="relative overflow-hidden border-2 border-indigo-300 rounded-lg shadow-xl bg-white"
    style="height: 300px"
  >
    <div
      class="absolute origin-top-left"
      style="transform: scale(0.3); width: 1000px; height: 1000px; pointer-events: none"
    >
      <PageView />
    </div>
  </div>
</template>
