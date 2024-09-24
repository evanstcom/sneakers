<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col justify-center items-center w-72 mx-auto">
    <img class="w-32 h-32 mb-4" :src="imageUrl" :alt="title" />
    <h2 class="text-2xl font-medium mb-2">{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>
