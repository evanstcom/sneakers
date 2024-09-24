<template>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-3xl font-bold mb-5">All Sneakers</h2>
    <div class="flex gap-4">
      <select v-model="filters.sortBy" class="border rounded-md px-2 outline-none">
        <option value="">Default</option>
        <option value="title">Name</option>
        <option value="price">Price low</option>
        <option value="-price">Price high</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="search" class="absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search..."
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          @input="onChangeInput"
        />
      </div>
    </div>
  </div>
  <CardList
    :items="items"
    @add-to-favorite="addToFavorite"
    @cart-action="cartAction"
    :show-buttons="true"
  />
</template>

<script setup>
import { onMounted, ref, inject, reactive, watch, provide } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import debounce from 'lodash.debounce'

const items = ref([])

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

const { cart, cartAction } = inject('cart')

const onChangeInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 1000)

const addToFavorite = async (item) => {
  const obj = {
    item_id: item.id
  }
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const { data } = await axios.post('https://5d9c616694353e93.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://5d9c616694353e93.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://5d9c616694353e93.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {}

    if (filters.sortBy) {
      params.sortBy = filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://5d9c616694353e93.mokky.dev/items', {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAddes: false,
      favoriteId: null
    }))
    fetchFavorites()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems)
</script>
