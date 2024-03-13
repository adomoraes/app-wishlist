<template>
    <div class="notifyContainer">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "WishlistsNotify",
    props: {
        message: String
    }
}
</script>