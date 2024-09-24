<template>
  <div id="map" style="width: 100%; height: 400px"></div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const coords = inject('coords')

onMounted(() => {
  // Проверяем, загружен ли уже скрипт Yandex Maps API
  if (
    !document.querySelector(
      'script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=3abb8697-040a-4691-86e4-90f498afff44"]'
    )
  ) {
    const script = document.createElement('script')
    script.src =
      'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=3abb8697-040a-4691-86e4-90f498afff44'
    script.async = true

    script.onload = () => {
      ymaps.ready(initMap)
    }

    document.head.appendChild(script)
  } else {
    // Если скрипт уже загружен, просто вызываем инициализацию карты
    ymaps.ready(initMap)
  }
})

const initMap = () => {
  // Инициализация карты
  console.log(coords.lat, coords.lon)
  const myMap = new ymaps.Map('map', {
    center: [coords.lat, coords.lon], // Координаты центра карты
    zoom: 9,
    mode: 'vector'
  })

  // Добавление метки на карту
  const placemark = new ymaps.Placemark([coords.lat, coords.lon], {
    hintContent: 'Я здесь!',
    balloonContent: 'Это красивая метка'
  })

  myMap.geoObjects.add(placemark)
}
</script>

<!-- <script setup>
onMounted(() => {
  // Проверяем, загружен ли уже скрипт Yandex Maps API
  if (
    !document.querySelector(
      'script[src="https://api-maps.yandex.ru/v3/?apikey=3abb8697-040a-4691-86e4-90f498afff44&lang=ru_RU"]'
    )
  ) {
    const script = document.createElement('script')
    script.src =
      'https://api-maps.yandex.ru/v3/?apikey=3abb8697-040a-4691-86e4-90f498afff44&lang=ru_RU'
    script.async = true
    document.head.appendChild(script)
  }
})
import { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } from '../../lib/ymaps'

const LOCATION = {
  center: [37.588144, 55.733842],
  zoom: 9
}
</script>

<template>
  <div style="width: 600px; height: 400px">
    <YMap :location="LOCATION">
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapMarker :coordinates="[37.588144, 55.733842]" :draggable="true">
        <section>
          <h1>You can drag this header</h1>
        </section>
      </YMapMarker>
    </YMap>
  </div>
</template> -->
