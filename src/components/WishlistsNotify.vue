<template>
    <v-alert
        :title="message"
        type="success"
    ></v-alert>
</template>

<script>
export default {
    name: "WishlistsNotify",
    props: {
        message: String
    }
}
</script>