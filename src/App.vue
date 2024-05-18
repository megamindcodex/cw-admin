<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
const socket = userStore.socket
// const route = useRoute()

socket.on('newMessage', async () => {
  await userStore.getConversations()
})

onMounted(async () => {
  await userStore.getUserData()
  userStore.connect_user_to_socket()
})
</script>

<template>
  <v-app>
    <NavBar />
    <RouterView />
  </v-app>
</template>

<style scoped>
</style>