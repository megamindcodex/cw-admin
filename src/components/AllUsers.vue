
<script setup>
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { cw_endpoint } from '../constant/endpoint'

const userStore = useUserStore()
const users = ref(null)

onMounted(async () => {
  const cookieName = 'token'
  const token = await userStore.getTokenFromCookies(cookieName)

  if (!token) {
    console.error('token is undefined')
    return null
  }

  // Include the token in the Authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(`${cw_endpoint}/get_all_users`, config)

  if (res.status === 200) {
    users.value = res.data
    console.log(res.data)
  }
})
</script>

<template>
  <div class="container pt-8 px-2" v-if="users">
    <!-- <h3>all users</h3> -->
    <RouterLink
      :to="`/chatRoom/${userName}`"
      class="userName pa-4"
      v-for="(userName, index) in users"
      :key="index"
    >
      <span>{{ userName }}</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100dvh;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  /* background-color: red; */
}
.users-cont {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
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
</style>