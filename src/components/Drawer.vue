<script setup>
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'
import { inject, computed, ref } from 'vue'

const props = defineProps({
  totalPrice: Number
})

const orderId = ref(null)

const { cart } = inject('cart')

const isCreating = ref(false)

const buttonDisabled = computed(() => isCreating.value || cart.length === 0)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://5d9c616694353e93.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })
    cart.value = []
    orderId.value = data.id
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-10"></div>
  <div class="bg-white h-full w-96 fixed right-0 top-0 z-20 p-8 flex flex-col">
    <DrawerHead />
    <InfoBlock
      v-if="orderId"
      title="Order is Done"
      :description="`Thank you for your order! Your order ${orderId}`"
      image-url="/order-success-icon.png"
      class="flex h-full items-center"
    />
    <InfoBlock
      v-if="!totalPrice && !orderId"
      title="The Cart is Empty"
      description="Please add any sneakers to the cart"
      image-url="/package-icon.png"
      class="flex h-full items-center"
    />
    <CartItemList v-if="totalPrice" />
    <div v-if="totalPrice">
      <div class="flex gap-2 mb-4">
        <span>Total:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} $</b>
      </div>
      <div class="flex gap-2 mb-4">
        <span>Tax 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ (totalPrice * 0.05).toFixed(0) }} $</b>
      </div>
      <button
        :disabled="buttonDisabled"
        class="bg-lime-500 w-full rounded-xl py-4 disabled:bg-slate-300 text-white font-bold hover:bg-lime-600 active:bg-lime-700"
        @click="createOrder"
      >
        BUY
      </button>
    </div>
  </div>
</template>
