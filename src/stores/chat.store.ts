import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import type { Content } from '@google/genai'

export const useChatStore = defineStore('chat', () => {
  const name = ref(useLocalStorage('providedName', ''))
  const providedName = computed(() => name.value)

  const messages = ref(useLocalStorage<ChatMessage[]>('conversation', []))
  const getMessages = computed(() => messages.value)

  const isTyping = ref(false)
  const getIsTyping = computed(() => isTyping.value)

  const conversationHistory = computed<Content[]>(() =>
    messages.value.map(({ message, itsMine }) =>
      itsMine
        ? { role: 'user', parts: [{ text: message }] }
        : { role: 'model', parts: [{ text: message }] },
    ),
  )

  const setName = (text: string) => (name.value = text)

  const setTyping = (value: boolean) => {
    isTyping.value = value
  }

  const saveMessage = (message: string, itsMine: boolean) => {
    messages.value.push({
      id: new Date().getTime(),
      message,
      itsMine,
    })
  }

  return {
    getMessages,
    conversationHistory,
    providedName,
    setName,
    saveMessage,
    setTyping,
    getIsTyping,
  }
})
