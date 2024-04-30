import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './userStore'
import { useRouter } from 'vue-router'

export const useCookieStore = defineStore('cookieStore', {
  state: () => ({
    token: null,
    cookieName: 'token',
    userStore: useUserStore(),
    router: useRouter()
  }),
  actions: {
    setCookies(token) {
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 1};`
    },

    deleteToken(cookieName) {
      document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      this.userStore.getTokenFromCookies('token')
      console.log(this.userStore.isLoggedIn)
      this.router.push({ name: 'login' })
      // const res = this.userStore.getTokenFromCookies(this.cookieName)
      // if (!res) {
      //   return false
      // }
    }
  }
})
