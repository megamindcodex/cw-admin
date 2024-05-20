import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import AllUserView from '@/views/AllUserView.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { cw_endpoint } from '@/constant/endpoint'

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
  // Log the previous route

  if (to.name === 'home' && (!token || token === '')) {
    // If the user is trying to access the chat room and there's no token, redirect to login
    next({ name: 'login' })
  } else {
    // Otherwise, proceed to the requested route
    next()
  }

  const previous_route = from.params.name

  if (to.name === 'chatRoom') {
    const userName = userStore.userName
    console.log(userName)
    const condition = true
    console.log(`Previous route: ${to.name}. condition: ${condition}`)

    if (!token) {
      console.error('token is undefined')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axios.put(
      `${cw_endpoint}/toggle_hasRead`,
      { receiverName: userName, condition },
      config
    )

    if (res.status === 200) {
      await userStore.getUserData()
    }
  }

  if (from.params.name === from.params.name) {
    console.log(`Previous route: ${previous_route}`)
    const receiverName = previous_route
    const condition = true

    if (!token) {
      console.error('token is undefined')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios.put(
      `${cw_endpoint}/toggle_hasRead`,
      { receiverName, condition },
      config
    )

    if (res.status === 200) {
      // console.log(res.data)
      await userStore.getConversations()
      // next()
    }
  }
})

export default router
