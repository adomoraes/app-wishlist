<template>
  <div>
    <h1>Cadastrar Wishlists</h1>
    <div>
      <WishlistsNotify :message="message" v-show="message" />
      <form id="wishlistForm" @submit="createWishlist">
        <div class="inputContainer">
            <label for="name">Nome Completo</label>
            <input
                type="text" 
                id="name"
                name="name"
                v-model="name"
                placeholder="Digite o nome do cliente"
            />
        </div>
        <div class="inputContainer">
            <label for="email">Email</label>
            <input
                type="email" 
                id="email"
                name="email"
                v-model="email"
                placeholder="Digite o email do cliente"
            />
        </div>
        <div class="inputContainer">
            <label for="vat">CPF</label>
            <input
                type="text" 
                id="vat"
                name="vat"
                v-model="vat"
                placeholder="Digite o CPF do cliente"
            />
        </div>
        <div class="inputContainer">
            <label for="phoneNumber">Telefone</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                v-model="phoneNumber"
                placeholder="Digite o telefone do cliente"
            />
        </div>
        <div class="inputContainer">
          <label for="wishlistItems">Escolha os produtos</label>
          <div class="checkboxContainer" v-for="wishlistItem in wishlistsItemsData" :key="wishlistItem.id">
            <input type="checkbox" name="wishlistItems" v-model="wishlistItems[wishlistItem.name]" :value="wishlistItem.name">
            <span>{{ wishlistItem.name }}</span>
          </div>
        </div>
        <div class="inputContainer">
            <input
                type="submit"
                class="inputSubmitButton"
                value="Enviar dados"
            />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import WishlistsNotify from '@/components/WishlistsNotify.vue'

export default {
  name: 'WishlistsForm',
  components:{
    WishlistsNotify
  },
  data(){ 
    return{
      wishlistsItemsData: null,
      name: null,
      email: null,
      vat: null,
      phoneNumber: null,
      wishlistItems: [],
      status: "Ativo",
      message: null
    }
  },
  methods: {

    async getProducts(){

      const req = await fetch('http://localhost:3000/wishlistsItems')
      const data = await req.json()
      this.wishlistsItemsData = data

    },
    async createWishlist(e){

      e.preventDefault()

      const data = {
        name: this.name,
        email: this.email,
        vat: this.vat,
        phoneNumber: this.phoneNumber,
        wishlistItems: Object.keys(this.wishlistItems),
        status: "Ativo"
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch("http://localhost:3000/wishlists",{
          method: "POST",
          headers: {"Content-type" : "application/json" },
          body: dataJson
      })

      await req.json()

      this.message = 'Cliente cadastrado com sucesso'
      setTimeout(() => this.message = "", 3000)

      this.name = ""
      this.email = ""
      this.vat = ""
      this.phoneNumber = ""
      this.wishlistItems = ""

    }

  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>
</style>
