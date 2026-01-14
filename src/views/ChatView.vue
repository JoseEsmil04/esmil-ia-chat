<template>
  <div class="background w-screen flex flex-col max-w-lg mx-auto full-height full-height-ios-fix">
    <div
      class="bg-gradient-to-r from-[#e27c4b] via-[#8063A7] to-[#3D536B] px-8 py-0 text-white flex justify-between items-center"
    >
      <span class="font-bold font-mono">JE.ai - Chat</span>
      <img class="w-20 h-20 rounded-full" :src="JELogo" alt="Esmil Logo" />
    </div>
    <ChatMessages/>
    <MessagesBox @send-message="onMessage" />
  </div>
</template>
<script setup lang="ts">
import { geminiChat } from "@/plugins/gemini-chat";
import { useChatStore } from "@/stores/chat.store";
import { sleep } from "@/helpers/sleep";
import ChatMessages from "@/components/ChatMessages.vue";
import MessagesBox from "@/components/MessagesBox.vue";
import JELogo from "@/images/je.ai-logov2.webp";

const chatStorage = useChatStore();


const onMessage = async (text: string) => {
  const { sendMessage } = geminiChat({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    initialHistory: chatStorage.conversationHistory,
    providedName: chatStorage.providedName
  });

  const trimmed = text.trim();
  if (!trimmed) return;

  chatStorage.saveMessage(trimmed, true);
  chatStorage.setTyping(true)

  try {
    const aiResponse = await sendMessage(trimmed);
    await sleep(1);

    chatStorage.saveMessage(aiResponse, false);
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  } finally {
    chatStorage.setTyping(false)
  }
};
</script>

<style scoped>
@supports (height: 100dvh) {
  .full-height {
    height: 100dvh;
  }
}

.full-height-ios-fix {
  padding-bottom: env(safe-area-inset-bottom);
}

.background {
  background-image: url('../images/background-je.webp');
  background-size: contain;
}
</style>