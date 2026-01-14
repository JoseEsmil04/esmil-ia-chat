<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4 chatDiv">
    <div class="flex flex-col space-y-2">
      <ChatBubble 
        v-for="message in chatStorage.getMessages" 
        :key="message.id" 
        v-bind="message"
      />
    <div v-if="chatStorage.getIsTyping" class="flex justify-start">
      <TypingIndicator />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { useChatStore } from '@/stores/chat.store'
import ChatBubble from './ChatBubble.vue'
import TypingIndicator from './TypingIndicator.vue'


const chatStorage = useChatStore()
const chatRef = ref<HTMLDivElement | null>(null)

onUpdated(() => {
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
})
</script>
<style>
.chatDiv {
  scroll-behavior: smooth;
}
</style>