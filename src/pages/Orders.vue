<template>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-3xl font-bold mb-5">My Orders</h2>
    <div class="flex gap-4">
      <select v-model="filters.sortBy" class="border rounded-md px-2 outline-none">
        <option value="-id">From New to Old</option>
        <option value="id">From Old to New</option>
      </select>
    </div>
  </div>

  <OrderList
    v-for="order in orders"
    :key="order.id"
    :order-number="order.id"
    :order-items="order.items"
    :total-order-price="order.totalPrice"
  />
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import axios from 'axios'
import OrderList from '@/components/OrderList.vue'

const orders = ref([])
const filters = reactive({
  sortBy: '-id'
})

const fetchOrders = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    const { data } = await axios.get('https://5d9c616694353e93.mokky.dev/orders', {
      params
    })
    orders.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchOrders()
})

watch(filters, fetchOrders)
</script>
