<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue'
import SidebarComponent from './SidebarComponent.vue'
</script>
<template>
  <HeaderComponent />
  <SidebarComponent />
  <main class="pt-20 px-4 sm:ml-64 text-black dark:text-slate-50">
    <slot></slot>
  </main>
</template>
