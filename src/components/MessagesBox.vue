<template>
  <div class="bg-[#352c43] p-4 flex items-center">
    <input
      type="text"
      placeholder="Escribe tu mensaje..."
      class="flex-1 border border-none rounded-md bg-[#5b4a72] text-white px-4 py-2 focus:outline-none placeholder-[#f0f0f0be]"
      v-model="message"
      @keypress.enter="sendMessage"
    />
    <button
      class="bg-[#8063A7] hover:bg-[#e27c4b] text-white rounded-full p-2 ml-2 focus:outline-none transition-all duration-300 transform hover:shadow-lg hover:shadow-[#3D536B]/50"
      @click="sendMessage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z"
        />
        <path d="M6.5 12h14.5" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const emits = defineEmits<{
  sendMessage: [text: string]
}>()

const sendMessage = () => {
  if (!message.value) return

  emits('sendMessage', message.value)

  message.value = ''
}
</script>
