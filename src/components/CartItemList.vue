<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-4 mb-4 flex-1 overflow-y-scroll scrollbar-thin" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
  background-color: white;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-thumb {
  background: rgba(112, 128, 144, 0.349);
  cursor: pointer;
  border-radius: 3px;
}
</style>
