<template>
  <div class="mx-auto" style="width: 400px;">
    <WishlistsNotify :message="message" v-show="message" />
    <v-card>
      <v-card-item>
        <v-card-title>Novo Cliente</v-card-title>
        <v-card-subtitle>Insira os dados e crie uma wishlist personalizada</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <form id="wishlistForm" @submit="createWishlist">
            <v-text-field 
              label="Nome"
              id="name"
              name="name"
              v-model="name" 
              variant="outlined">
            </v-text-field>

            <v-text-field 
              label="Email"
              id="email"
              name="email"
              v-model="email" 
              variant="outlined">
            </v-text-field>

            <v-text-field 
              label="CPF"
              id="vat"
              name="vat"
              v-model="vat" 
              variant="outlined">
            </v-text-field>

            <v-text-field 
              label="Telefone"
              id="phoneNumber"
              name="phoneNumber"
              v-model="phoneNumber" 
              variant="outlined">
            </v-text-field>
            <h3>Selecione os produtos:</h3>
            <v-list 
            lines="one"
            v-for="wishlistItem in wishlistsItemsData" 
            :key="wishlistItem.id">
              <v-list-item value="{{ wishlistItem.name }}">
                <template v-slot:append="{  }">
                  <v-list-item-action>
                    <input type="checkbox" name="wishlistItems" v-model="wishlistItems[wishlistItem.name]" :value="wishlistItem.name">
                  </v-list-item-action>
                </template>
                <v-list-item-title>{{ wishlistItem.name }}</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-btn type="submit" rounded="xl" size="x-large" block>SALVAR</v-btn>
      </form>
      </v-card-text>
    </v-card>
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
