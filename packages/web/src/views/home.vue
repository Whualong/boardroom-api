<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
const count = ref(0)
</script>

<template>
  <div>
    登录深信
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
