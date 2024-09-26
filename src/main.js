import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Orders from './pages/Orders.vue'
import Map from './pages/Map.vue'
import NotFound from './pages/NotFound.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/map', name: 'Map', component: Map }
  /*   {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '404'
  } */
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
