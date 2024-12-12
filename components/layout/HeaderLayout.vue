<template>
  <header class="relative min-h-11 flex justify-between items-center px-5 py-2">
    <div class="header--logo">
      <NuxtLink to="/">
        <strong class="text-sm text-slate-600">Rent-A-Kalle</strong>
      </NuxtLink>
    </div>

    <div class="header--menu">
      <UButton variant="soft" :icon="iconString"></UButton>
    </div>
  </header>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const iconString = computed(() =>
  isOpen.value ? "i-heroicons-x-mark" : "i-heroicons-bars-3"
);
</script>
