

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import Logo from '@/components/Logo.vue'
import ProfileDP from '../components/ProfileDP.vue'
import { useUserStore } from '../stores/userStore'
import { useCookieStore } from '@/stores/cookieStore'
const route = ref(useRoute())
const router = useRouter()
// console.log(route.value.fullPath)
const drawer = ref(false)
const userStore = useUserStore()
const cookieStore = useCookieStore()
const token = ref(null)
const isLoggedIn = ref(false)

const navRoutes = ref([
  {
    name: 'Home',
    url: 'home'
  },
  {
    name: 'allusers',
    url: 'allusers'
  },
  {
    name: 'login',
    url: 'login'
  }
])

onMounted(async () => {
  const cookieName = 'token'
  const result = await userStore.getTokenFromCookies(cookieName)

  if (result) {
    isLoggedIn.value = userStore.isLoggedIn
    // console.log(isLoggedIn.value)
  } else {
    isLoggedIn.value = false
    // console.log(isLoggedIn.value)
  }

  if (result) {
    token.value = result
    // console.log(result)
  } else {
    isLoggedIn.value = false
  }
})

const navigateTo = (routeName) => {
  console.log(routeName)
  router.push({ name: routeName })
}

const currentRoute = ref(null)
const activeRoute = (routeName) => {
  if (currentRoute.value === routeName) return currentRoute
}

// Watch for changes in userStore.isLoggedIn and update isLoggedIn accordingly
watch(
  () => userStore.isLoggedIn,
  (newValue) => {
    isLoggedIn.value = newValue
    // console.log(isLoggedIn.value)
  }
)

watch(
  () => route.name,
  (newRoute) => {
    currentRoute.value = newRoute
  }
)
</script>

<template>
  <div class="head px-2" v-show="route.path !== `/chatRoom/${route.params.name}` && isLoggedIn">
    <!-- <RouterLink to="/" class="logo-link"><Logo /></RouterLink> -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.8"
      stroke="currentColor"
      class="w-2 h-6 menu"
      @click.stop="drawer = !drawer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
      />
    </svg>
    <v-navigation-drawer v-model="drawer" location="top" temporary class="nan-cont">
      <ProfileDP />
      <div class="nav pt-3" v-if="navRoutes">
        <span
          :class="{ active: activeRoute(nav.url) }"
          class="nav-item pa-1"
          v-for="nav in navRoutes"
          :key="nav.name"
          @click="navigateTo(nav.url)"
        >
          <span v-if="isLoggedIn">
            <span v-show="nav.name !== 'login'">{{ nav.name }}</span>
          </span>
          <span v-else>
            <span v-show="nav.name === 'login'">{{ nav.name }}</span>
          </span>
        </span>
      </div>

      <div class="btn" v-if="isLoggedIn" @click="cookieStore.deleteToken('token')">
        <button class="py-1">log out</button>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* .nan-cont {
  display: flex;
} */
.nav {
  width: 100%;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}

.nav-item {
  width: 80%;
  text-align: center;
  cursor: pointer;
  transition: ease 0.3s;
  border-radius: 5px;
}

.nav-item:hover {
  color: #fff;
  background-color: gray;
}

.active {
  color: white;
  background-color: #000;
}
.menu {
  width: 2.7rem;
}

.logo-link {
  text-decoration: none;
  color: #000;
}

.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn button {
  width: 50%;
  font-size: 18px;
  font-weight: 600;
  color: rgb(228, 89, 89);
  border: 1px solid #000;
}
</style>