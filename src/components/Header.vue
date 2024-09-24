<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <RouterLink to="/" class="flex items-center gap-4">
      <img class="w-10" src="/logo.png" alt="logo" />
      <div>
        <h2 class="text-xl font-bold uppercase">VUE SHOP</h2>
        <p class="text-slate-400">Sneakers shop</p>
      </div>
    </RouterLink>
    <ul class="flex items-center gap-10">
      <RouterLink to="map">
        <li
          class="flex items-center gap-3 transition text-gray-500 relative cursor-pointer hover:text-black"
        >
          <img class="w-3 absolute top-2 -left-5" src="/navigate.svg" alt="location" />
          <span>{{ userCity }}</span>
        </li>
      </RouterLink>
      <RouterLink to="/favorites">
        <li
          class="flex items-center gap-3 transition text-gray-500 cursor-pointer hover:text-black"
        >
          <img src="/heart.svg" alt="favorite" />
          <span>Favorites</span>
        </li>
      </RouterLink>
      <RouterLink to="/orders">
        <li
          class="flex items-center gap-3 transition text-gray-500 cursor-pointer hover:text-black"
        >
          <img src="/profile.svg" alt="profile" />
          <span>Orders</span>
        </li>
      </RouterLink>
      <li
        @click="toogleDrawer"
        class="relative flex flex-1 items-center gap-3 transition text-gray-500 cursor-pointer hover:text-black"
      >
        <div
          class="h-4 w-4 border border-slate-300 rounded-full absolute bg-slate-800 z-5 text-white flex justify-center items-center -top-1 left-2 text-xs"
        >
          {{ totalCartItems }}
        </div>
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} $</b>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
const { toogleDrawer } = inject('cart')
const userCity = inject('userCity')

defineProps({
  totalPrice: Number,
  totalCartItems: Number
})
</script>
