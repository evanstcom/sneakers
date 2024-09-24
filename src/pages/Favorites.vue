<script setup>
import { onMounted, ref } from 'vue'
import CardList from '@/components/CardList.vue'
import axios from 'axios'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://5d9c616694353e93.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <h2 class="text-3xl font-bold mb-5">Favorites</h2>
  <CardList :items="favorites" :show-buttons="false" />
</template>
