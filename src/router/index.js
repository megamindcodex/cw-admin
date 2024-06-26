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

  if (to.params.name === to.params.name) {
    const route_to_visit = to.params.name
    const receiverName = route_to_visit
    const condition = true
    console.log(`route to visit: ${route_to_visit}. condition: ${condition}`)

    if (!token) {
      console.error('token is undefined')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if (!route_to_visit) {
      console.log('route to visit is undefined')
      return
    }
    const res = await axios.put(
      `${cw_endpoint}/toggle_hasRead`,
      { receiverName, condition },
      config
    )
    console.log(receiverName)

    if (res.status === 200) {
      await userStore.getUserData()
    }
  }

  if (from.params.name === from.params.name) {
    const previous_route = from.params.name

    const receiverName = from.params.name
    const condition = true
    console.log(`Previous route: ${previous_route}, ${condition}`)

    if (!token) {
      console.error('token is undefined')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if (!previous_route) {
      console.log('previous route is undefined')
      return
    }
    const res = await axios.put(
      `${cw_endpoint}/toggle_hasRead`,
      { receiverName, condition },
      config
    )

    if (res.status === 200) {
      // console.log(res.data)
      // await userStore.getConversations()
      await userStore.getUserData()
      // next()
    }
  }
})

export default router
