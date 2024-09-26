<template>
  <div
    class="relative bg-white border-slate-500 p-8 rounded-3xl transition hover:-translate-y-2 hover:shadow-xl flex flex-col"
  >
    <img
      v-if="showButtons"
      class="absolute top-8 left-8 cursor-pointer"
      :class="
        isFavorite
          ? 'absolute top-8 left-8 cursor-pointer'
          : 'absolute top-8 left-8 cursor-pointer opacity-50 hover:opacity-100 transition'
      "
      :src="isFavorite ? 'like-2.svg' : 'like-1.svg'"
      alt="like"
      @click="onCkickFavorite"
    />
    <img :src="imageUrl" alt="sneaker" class="flex-1" />
    <p class="mt-5 flex-1">{{ title }}</p>
    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Price</span>
        <b>{{ price }} $</b>
      </div>
      <img
        v-if="showButtons"
        @click="onClickAdd"
        :src="isAdded ? 'checked.svg' : 'plus.svg'"
        alt="plus"
        :class="
          isAdded
            ? 'w-6 h-6 cursor-pointer'
            : 'w-6 h-6 cursor-pointer opacity-50 hover:opacity-100 transition'
        "
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onCkickFavorite: Function,
  onClickAdd: Function,
  showButtons: Boolean
})
</script>
