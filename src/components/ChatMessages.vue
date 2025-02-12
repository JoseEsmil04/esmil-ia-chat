<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4 chatDiv">
    <div class="flex flex-col space-y-2">
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import ChatBubble from './ChatBubble.vue'

interface Props {
  messages: ChatMessage[]
}

defineProps<Props>()
const chatRef = ref<HTMLDivElement | null>(null)

onUpdated(() => {
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
})
</script>
<style scoped>
.chatDiv {
  scroll-behavior: smooth;
}

</style>