<template>
  <div>
    <WishlistsForm />
  </div>
</template>

<script>
// @ is an alias to /src
import WishlistsForm from '@/components/WishlistsForm.vue'

export default {
  name: 'WishlistsView',
  components: {
    WishlistsForm
  }
}
</script>
