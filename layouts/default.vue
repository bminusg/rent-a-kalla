<template>
  <div class="relative h-screen flex flex-col">
    <HeaderLayout />
    <main class="flex-1 p-5">
      <slot></slot>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import HeaderLayout from "~/components/layout/HeaderLayout.vue";
</script>
