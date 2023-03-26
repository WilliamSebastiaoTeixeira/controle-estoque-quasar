import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

const toggleFromStorage: string | undefined = localStorage.getItem('fullWidth') ?? undefined

export const useFullWidthStore = defineStore('fullWidth', () => {
  const get = ref(false) as Ref<boolean>
  get.value = toggleFromStorage ? !!toggleFromStorage : false

  function toggle () {
    if(!get.value){
      localStorage.setItem('fullWidth', 'true')
      get.value = true
    }
    else {
      get.value = false
      localStorage.removeItem('fullWidth')
    }
  }
  return { get, toggle }
})
