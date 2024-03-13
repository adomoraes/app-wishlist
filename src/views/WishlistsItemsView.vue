<template>
  <div>
    <WishlistsItemsForm />
  </div>
</template>

<script>
// @ is an alias to /src
import WishlistsItemsForm from '@/components/WishlistsItemsForm.vue'

export default {
  name: 'WishlistsView',
  components: {
    WishlistsItemsForm
  }
}
</script>
