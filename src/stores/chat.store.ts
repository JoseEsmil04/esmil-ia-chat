import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import type { Content } from '@google/generative-ai'
import type { ChatMessage } from '@/interfaces/chat-message.interface'

export const useChatStore = defineStore('chat', () => {
  const name = ref(useLocalStorage('providedName', '')) 
  const providedName = computed(() => name.value)

  const messages = ref(useLocalStorage<ChatMessage[]>('conversation', []))
  const getMessages = computed(() => messages.value)

  const conversationHistory = computed<Content[]>(() => 

    messages.value.map(({ message, itsMine }) => {
      return itsMine
        ? { role: 'user', parts: [{ text: message }] }
        : { role: 'model', parts: [{ text: message }] }
    })
  )

  const setName = (text: string) => (name.value = text)

  const saveMessage = (message: string, itsMine: boolean) => {
    messages.value.push({
      id: new Date().getTime(),
      message: message,
      itsMine: itsMine,
    })
  }

  return {
    getMessages,
    conversationHistory,
    providedName,
    setName,
    saveMessage
  }
})
