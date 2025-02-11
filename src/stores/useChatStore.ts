import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const name = ref(useLocalStorage('providedName', ''))
  const providedName = computed(() => name.value)

  const setName = (text: string) => (name.value = text)

  return { providedName, setName }
})
