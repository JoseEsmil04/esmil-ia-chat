<template>
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-[#F8AFA6] text-black p-2 rounded-lg max-w-xs">
      <p class="font-bold">{{ providedName }}</p>
      <span>{{ message }}</span>
    </div>
  </div>
  <div v-else class="flex">
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs flex flex-col">
      <p class="font-bold">JE</p>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number
  message: string
  itsMine: boolean
  providedName: string
}

defineProps<Props>()
</script>
