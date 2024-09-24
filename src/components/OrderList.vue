<template>
  <div
    class="flex flex-col gap-2 mb-4 border-slate-500 p-8 rounded-3xl transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div class="flex justify-between items-center">
      <p class="text-xl font-bold">Order {{ orderNumber }}</p>
    </div>
    <div class="flex flex-col gap-2 mb-2">
      <OrderItem v-for="orderItem in orderItems" :key="orderItem.id" :order-item="orderItem" />
    </div>
    <div class="flex justify-between items-center mb-2">
      <p class="text-l font-bold">Total</p>
      <p class="text-l font-bold">{{ totalOrderPrice }} $</p>
    </div>
  </div>
</template>

<script setup>
import OrderItem from './OrderItem.vue'
defineProps({
  orderItems: Object,
  orderNumber: Number,
  totalOrderPrice: Number
})
</script>
