import { createRouter, createWebHistory } from 'vue-router'
import WishlistsView from '../views/WishlistsView.vue'

const routes = [
  {
    path: '/',
    name: 'wishlists',
    component: WishlistsView
  },
  {
    path: '/wishlistsList',
    name: 'wishlistsList',
    component: () => import(/* webpackChunkName: "wishlistsList" */ '../views/WishlistsListView.vue')
  },
  {
    path: '/wishlistsItems',
    name: 'wishlistsItems',
    component: () => import(/* webpackChunkName: "wishlistItems" */ '../views/WishlistsItemsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
