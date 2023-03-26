import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

const drawerFromStorage: string | undefined = localStorage.getItem('drawer') ?? undefined

export const useDrawerStore = defineStore('fullWidth', () => {
  const get = ref(false) as Ref<boolean>
  get.value = drawerFromStorage ? !!drawerFromStorage : false

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
