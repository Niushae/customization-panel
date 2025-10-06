<script setup lang="ts">
import PageView from '@/views/PageView.vue'
</script>

<template>
  <div
    class="relative overflow-hidden border-2 border-indigo-300 rounded-lg shadow-xl bg-white max-w-lg h-96 mx-auto"
  >
    <div class="absolute origin-top-left pointer-events-none w-[1000px] h-[1000px] scale-50">
      <PageView />
    </div>
  </div>
</template>
