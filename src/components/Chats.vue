

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const user = userStore.user
const noContacts = ref(false)
const socket = userStore.socket
const route = useRoute()
// const contactName = ref()

// console.log()
// Function to check if the current route matches the desired pattern

onMounted(async () => {
  await userStore.getConversations()
  // console.log(userStore.conversations)
  if (userStore.conversations.length > 0) {
    noContacts.value = true
  } else {
    noContacts.value = false
  }
})
</script>

<template>
  <div class="container pt-8 px-1 ga-2" v-if="noContacts">
    <RouterLink
      v-for="contact in userStore.conversations"
      :key="contact._id"
      :to="`/chatRoom/${contact.users[1]}`"
      class="userName"
    >
      <v-card-title>
        {{ contact.users[1] }}
      </v-card-title>
      <v-badge v-show="!contact.hasRead" inline color="green-accent-3" class="msg_badge"> </v-badge>
    </RouterLink>
  </div>
  <RouterLink to="/allusers" class="new-chat pa-4 mr-5"
    ><i class="fa-solid fa-plus"></i
  ></RouterLink>
  <div v-if="!noContacts">Chat contacts appear here</div>

  <div v-show="userStore.isLoading">chats Loading</div>
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
  flex-direction: column;
  /* background-color: red; */
}

.userName {
  position: relative;
  width: 100%;
  text-decoration: none;
  color: #000;
  /* background-color: blue; */
  border: 1px solid #000;
  /* border-radius: 10px; */
  transition: 0.5s ease;
}

.userName:hover {
  border: 1px solid rgb(104, 103, 103);
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

.msg_badge {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}
</style>