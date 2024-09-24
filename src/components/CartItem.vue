<template>
  <div class="border border-slate-200 gap-4 rounded-xl flex items-center justify-between p-2">
    <img :src="imageUrl" alt="sneaker" class="w-16" />
    <div class="flex flex-1 flex-col justify-between">
      <p class="mb-2">{{ title }}</p>
      <div class="flex justify-between">
        <p class="font-bold">{{ price }} $</p>
        <img
          @click="emits('onClickRemove')"
          class="opacity-50 cursor-pointer hover:opacity-100 transition w-6 h-6"
          src="/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number
})

const emits = defineEmits(['onClickRemove'])
</script>
