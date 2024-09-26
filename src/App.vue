<script setup>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import axios from 'axios'
import { provide, ref, watch, computed, onMounted } from 'vue'

import { RouterView } from 'vue-router'

const cart = ref([])
const drawerOpen = ref(false)
const userCity = ref('')
const userIp = ref('')
const coords = ref({
  lat: 0,
  lon: 0
})

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const totalCartItems = computed(() => cart.value.length)

const toogleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
  console.log(drawerOpen.value)
}

const cartAction = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const getIp = async () => {
  try {
    const { data } = await axios.get('https://api.ipify.org?format=json')
    userIp.value = data.ip
    return data.ip
  } catch (error) {
    console.log(error)
  }
}

const getCity = async () => {
  const token = 'b797626747934a217d0d488c5aeac332050bad16'
  const ip = await getIp()
  try {
    const { data } = await axios.get(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      }
    )

    userCity.value = data.location.data.city
    coords.lat = data.location.data.geo_lat
    coords.lon = data.location.data.geo_lon
    console.log(coords.lat, coords.lon)
  } catch (error) {
    console.log(error)
  }
}

const getAddress = async () => {
  const token = 'b797626747934a217d0d488c5aeac332050bad16'
  const location = {
    lat: '51.4145809',
    lon: '36.7074637'
  }
  try {
    const { data } = await axios.post(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
      location,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      }
    )
  } catch (error) {}
}

onMounted(() => {
  getCity()
  getAddress()
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
watch(coords, () => {
  getCity()
})
provide('cart', { cart, toogleDrawer, cartAction, removeFromCart })
provide('userCity', userCity)
provide('coords', coords)
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-14">
    <Header :total-price="totalPrice" :total-cart-items="totalCartItems" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
