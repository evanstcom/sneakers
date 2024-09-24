<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center gap-4">
      <img :src="orderItem.imageUrl" alt="" class="w-16" />
      <p>{{ orderItem.title }}</p>
    </div>
    <p>{{ orderItem.price }}</p>
  </div>
</template>

<script setup>
defineProps({
  orderItem: Object
})
</script>
