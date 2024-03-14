<template>
  <div class="mx-auto" style="width: 400px;">
    <WishlistsNotify :message="message" v-show="message" />
    <v-card>
      <v-card-item>
        <v-card-title>Cadastrar Novo Produto</v-card-title>
        <v-card-subtitle>Insira um novo item para disponibilizar nas wishlists</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <form id="productForm" @submit.prevent="createProduct">
            <v-text-field 
              label="Nome do Produto"
              id="name"
              name="name"
              v-model="name" 
              variant="outlined">
            </v-text-field>
            <v-btn type="submit" rounded="xl" size="x-large" block>SALVAR</v-btn>
      </form>
      </v-card-text>
    </v-card>
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title><h4>Estoque de produtos para wishlist</h4></v-toolbar-title>
      </v-toolbar>
      <v-list 
        lines="one"
        v-for="(wishlistItem, index) in wishlistsItems" 
        :key="index">
        <v-list-item value="{{ wishlistItem.name }}">
          <template v-slot:append="{  }">
            <v-list-item-action>
              <select name="status" class="status" @change="updatedWishlistItem($event, wishlistItem.id)">
                <option value="">Selecione...</option>
                <option v-for="s in status"
                :key="s.id"
                :selected="wishlistItem.status == s.tipo"
                :value="s.tipo">{{ s.tipo }}</option>
              </select> 
              <button class="deleteBtn" @click="deleteWishlistItem(wishlistItem.id)">Excluir</button>
            </v-list-item-action>
          </template>
          <v-list-item-title>{{ wishlistItem.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import WishlistsNotify from '@/components/WishlistsNotify.vue'

export default{
    name: 'WishlistsItemsForm',
    components:{
      WishlistsNotify
    },
    data(){
        return {
          wishlistsItems: null,
          name: null,
          status: null,
          message: null
        }
    },
    methods: {
      async createProduct(e){
        e.preventDefault()

        const data = {
          name: this.name,
          status: "Ativo"
        }

        const dataJson = JSON.stringify(data)
        const req = await fetch("http://localhost:3000/wishlistsItems",{
            method: "POST",
            headers: {"Content-type" : "application/json" },
            body: dataJson
        })
        await req.json()

        this.message = 'Produto cadastrado com sucesso'
        setTimeout(() => this.message = "", 3000)

        this.getProducts()
        this.name = ""
      },
      async getProducts(){

        const req = await fetch('http://localhost:3000/wishlistsItems')
        const data = await req.json()
        this.wishlistsItems = data
        
      },
      async getStatus(){

        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()
        this.status = data

      },
      async updatedWishlistItem(event, id){
        const option = event.target.value
        const dataJson = JSON.stringify({ status: option })
        const req = await fetch(`http://localhost:3000/wishlistsItems/${id}`,{
            method: "PATCH",
            headers: {"Content-type" : "application/json" },
            body: dataJson
        })
        await req.json()

        this.message = 'Produto ATUALIZADO com sucesso'
        setTimeout(() => this.message = "", 3000)

        this.getProducts()
      },
      async deleteWishlistItem(id){
        if(confirm("Tem certeza?")){
          const req = await fetch(`http://localhost:3000/wishlistsItems/${id}`,{
            method: "DELETE"
          })
          await req.json()

          this.message = 'Produto EXCLUIDO com sucesso'
          setTimeout(() => this.message = "", 3000)
        }
        this.getProducts()
      }
      
    },
    mounted() {
      this.getProducts(),
      this.getStatus()
    }
}
</script>
<style scoped>

</style>