<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div
      class="bg-gradient-to-r from-[#C04040] via-[#8063A7] to-[#3D536B] p-4 text-white flex justify-between items-center"
    >
      <span class="font-bold font-mono">Esmil IA - Chat</span>
      <img class="w-10 h-10" :src="JoseEsmilLogo" alt="Esmil Logo" />
    </div>

    <ChatMessages :messages="messages" :provided-name="providedName" />
    <MessagesBox @send-message="onMessage" />
  </div>
</template>
<script setup lang="ts">
import ChatMessages from '@/components/ChatMessages.vue'
import JoseEsmilLogo from '@/img/joseecampusanologowhite.webp'
import MessagesBox from '@/components/MessagesBox.vue'
import { geminiChat } from '@/helpers/gemini-chat'
import { sleep } from '@/helpers/sleep'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import type { Content } from '@google/generative-ai'
import { onMounted, ref, watch } from 'vue'

interface Props {
  providedName: string
}

defineProps<Props>()

const messages = ref<ChatMessage[]>([])
const conversationHistory = ref<Content[]>([])

onMounted(() => {
  const conversationStorage = localStorage.getItem('conversation')
  if (conversationStorage) {
    const conversation: ChatMessage[] = JSON.parse(conversationStorage)

    messages.value = conversation

    const conversationParse: Content[] = conversation.map(({ message, itsMine }) => {
      return itsMine
        ? { role: 'user', parts: [{ text: message }] }
        : { role: 'model', parts: [{ text: message }] }
    })
    conversationHistory.value.push(...conversationParse)
  }
})

watch(
  messages,
  () => {
    localStorage.setItem('conversation', JSON.stringify(messages.value))
  },
  { deep: true },
)

const onMessage = async (text: string) => {
  const { sendMessage } = await geminiChat(
    import.meta.env.VITE_GEMINI_API_KEY,
    conversationHistory.value,
  )
  if (text.length === 0) return

  // User Messages
  messages.value.push({
    id: new Date().getTime(),
    message: text,
    itsMine: true,
  })

  try {
    const aiResponse = await sendMessage(text)

    conversationHistory.value.push(
      { role: 'user', parts: [{ text }] },
      { role: 'model', parts: [{ text: aiResponse }] },
    )

    await sleep(1)

    messages.value.push({
      id: new Date().getTime(),
      message: aiResponse,
      itsMine: false,
    })
  } catch (error) {
    console.error('Error al procesar el mensaje:', error)
  }
}
</script>
