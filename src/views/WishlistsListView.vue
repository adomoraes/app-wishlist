<template>
  <div>
    <h1>Dashboard Wishlists</h1>
    <WishlistsDash />
  </div>
</template>

<script>
// @ is an alias to /src
import WishlistsDash from '@/components/WishlistsListDash.vue'

export default {
  name: 'WishlistsListView',
  components: {
    WishlistsDash
  }
}
</script>
