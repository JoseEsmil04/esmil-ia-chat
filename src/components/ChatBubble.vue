<template>
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-[#c0663cde] text-white p-2 rounded-lg max-w-xs">
      <p class="font-bold">{{ store.providedName }}</p>
      <span v-html="renderMarkdown(message)"></span>
    </div>
  </div>

  <div v-else class="flex">
    <div class="bg-[#45375cdf] text-white p-2 rounded-lg max-w-xs flex flex-col">
      <p class="font-bold">JE</p>
      <span v-html="renderMarkdown(message)"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat.store'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const store = useChatStore()

interface Props {
  id: number
  message: string
  itsMine: boolean
}

defineProps<Props>()

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
})

const renderMarkdown = (text: string) => {
  const html = md.render(text || '')
  return DOMPurify.sanitize(html)
}
</script>

<style scoped>
span strong {
  font-weight: 700;
}

span ul {
  padding-left: 1.2rem;
}

span code {
  background: rgba(0, 0, 0, 0.25);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.85rem;
}
</style>
