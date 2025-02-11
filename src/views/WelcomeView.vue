<template>
  <div class="flex flex-col w-screen h-screen items-center justify-center">
    <img :src="JELogo" class="h-32 w-32 rounded-xl" />
    <ErrorAlert class="mt-5" v-if="alert">{{ alert }}</ErrorAlert>
    <label class="m-2 text-[#3D536B] font-bold text-3xl text-center" for="name"
      >Introduce tu nombre para continuar</label
    >
    <input
      class="text-center border-2 text-xl m-2 rounded-md w-72 h-12"
      :class="[alert ? 'border-[#C04040]' : 'border-[#3D536B]']"
      @keypress.enter="checkNameInput(name)"
      v-model="name"
      type="text"
      id="name"
      placeholder="Introduce tu nombre"
    />
    <button
      class="text-center text-white font-bold bg-[#8063A7] hover:bg-[#3D536B] m-4 rounded-md w-[170px] h-[40px] focus:outline-none transition-all duration-300 transform hover:shadow-lg hover:shadow-[#3D536B]/50"
      @click="checkNameInput(name)"
    >
      Acceder
    </button>
  </div>
</template>

<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue'
import { ref } from 'vue'
import JELogo from '@/img/JE.ai.webp'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/useChatStore'

const name = ref('')
const alert = ref('')
const router = useRouter()
const chatStore = useChatStore()

const checkNameInput = (name: string) => {
  if (name.length <= 0) {
    alert.value = 'Nombre incorrecto, intenta de nuevo!'
    setTimeout(() => (alert.value = ''), 3000)
    return
  }

  chatStore.setName(name)
  router.push({ name: 'chat' })
}
</script>

<style scoped></style>
