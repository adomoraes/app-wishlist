<template>
  <v-app>
    <v-main>
      <nav>
        <router-link to="/">Wishlists</router-link> |
        <router-link to="/wishlistsList">Wishlists Dash</router-link> |
        <router-link to="/wishlistsItems">Wishlist Items</router-link>
      </nav>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
