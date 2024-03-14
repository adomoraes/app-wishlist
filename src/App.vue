<template>
  <v-app>
    <v-main>
      <nav class="mx-auto my-4" style="width: 400px;">
        <v-chip color="primary" variant="flat" class="mr-4">
          <router-link to="/">Nova Wishlist</router-link> 
        </v-chip>
        <v-chip color="purple" variant="flat" class="mr-4">
          <router-link to="/wishlistsList">Dashboard</router-link>
        </v-chip>
        <v-chip color="green" variant="flat">
          <router-link to="/wishlistsItems">Produtos</router-link>
        </v-chip>
      </nav>
      <router-view />
    </v-main>
  </v-app>
</template>

<script scoped>
  //
</script>
