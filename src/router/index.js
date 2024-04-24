import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import AllUserView from '@/views/AllUserView.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/allusers',
      name: 'allusers',
      component: AllUserView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/chatRoom/:name',
      name: 'chatRoom',
      component: ChatRoom
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = await userStore.getTokenFromCookies(userStore.cookieName)

  if (to.name === 'home' && (!token || token === '')) {
    // If the user is trying to access the chat roo and there's no token, redirect to login
    next({ name: 'login' })
  } else {
    // Otherwise, proceed to the requested route
    next()
  }
})

export default router
