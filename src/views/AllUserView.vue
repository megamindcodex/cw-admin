

<script setup>
import { useRouter } from 'vue-router'
import AllUsers from '../components/AllUsers.vue'

const router = useRouter()
</script>

<template>
  <div class="pa-4 d-flex align-center justify-start">
    <i class="fa-solid fa-chevron-left pa-2" @click="router.push('/')"></i>
    <h3 class="ml-4 mt-1">Add new chat</h3>
  </div>
  <AllUsers />
</template>
  
<style scoped>
.fa-chevron-left {
  color: #000;
  font-size: 23px;
}
</style>