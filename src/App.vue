<script setup lang="ts">
import { ref } from 'vue'
import ChatView from './views/ChatView.vue'
import WelcomeView from './views/WelcomeView.vue'

const providedName = ref('')
const onName = (name: string) => (providedName.value = name)
</script>

<template>
  <WelcomeView v-if="providedName.length <= 0" @check-name-input="onName" />
  <ChatView v-else :provided-name="providedName" />
</template>

<style scoped></style>
