

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const user = userStore.user
// const contactName = ref()

onMounted(async () => {
  await userStore.getConversations()
})
</script>

<template>
  <div class="container pt-8 px-2" v-if="userStore.conversations">
    <RouterLink
      v-for="contact in userStore.conversations"
      :key="contact._id"
      :to="`/chatRoom/${contact.users[1]}`"
      class="pa-3 userName"
    >
      <v-card-title>
        {{ contact.users[1] }}
      </v-card-title>
    </RouterLink>
    <RouterLink to="/allusers" class="new-chat pa-4 mr-5"
      ><i class="fa-solid fa-plus"></i
    ></RouterLink>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  height: 100dvh;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  /* background-color: red; */
}

.userName {
  width: 100%;
  text-decoration: none;
  color: #000;
  /* background-color: blue; */
  border: 2px solid #000;
  border-radius: 10px;
  transition: 0.5s ease;
}

.userName:hover {
  border: 2px solid rgb(104, 103, 103);
  background: rgb(104, 103, 103);
  color: #fff;
}
.new-chat {
  position: fixed;
  bottom: 150px;
  right: 0;
  background-color: rgb(207, 40, 40);
  border-radius: 20%;
}

.fa-plus {
  font-size: 2rem;
  color: #fff;
  transition: 0.3s ease;
}
/* .new-chat:hover .fa-plus {
  color: #000;
} */
</style>