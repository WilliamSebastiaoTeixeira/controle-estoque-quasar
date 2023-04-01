import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

const miniStateFromStorage: string | undefined = localStorage.getItem('miniState') ?? undefined

export const useMiniStateStore = defineStore('miniState', () => {
  const get = ref(false) as Ref<boolean>
  get.value = miniStateFromStorage ? !!miniStateFromStorage : false

  function toggle() {
    if (!get.value) {
      localStorage.setItem('miniState', 'true')
      get.value = true
    }
    else {
      get.value = false
      localStorage.removeItem('miniState')
    }
  }
  return { get, toggle }
})
