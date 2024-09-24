<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  showButtons: Boolean
})

const emits = defineEmits(['addToFavorite', 'cartAction'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :isAdded="item.isAdded"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onCkickFavorite="() => emits('addToFavorite', item)"
      :onClickAdd="() => emits('cartAction', item)"
      :show-buttons="showButtons"
    />
  </div>
</template>
