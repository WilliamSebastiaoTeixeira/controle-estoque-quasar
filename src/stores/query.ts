import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface Query {
  [key: string] : Date | string | null
}

const queryFromStorage: string | undefined = localStorage.getItem('query') ?? undefined

export const useQueryStore = defineStore('query', () => {
  const query = ref(undefined) as Ref<Query | undefined>
  query.value = queryFromStorage ? JSON.parse(queryFromStorage) : queryFromStorage

  function set(incomingQuery: Query | undefined){
    if(incomingQuery) localStorage.setItem('query', JSON.stringify(incomingQuery))
    query.value = incomingQuery
  }

  function clear(){
    localStorage.removeItem('query')
    set(undefined)
  }

  return {
    set,
    clear,
    query
  }
})
