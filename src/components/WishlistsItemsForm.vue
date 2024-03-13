<template>
  <div>
    <h1>Cadastrar Wishlists Items</h1>
    <WishlistsNotify :message="message" v-show="message" />
    <form id="productForm" @submit="createProduct">
      <div class="inputContainer">
          <label for="name">Nome do Produto</label>
          <input
              type="text" 
              id="name"
              name="name"
              v-model="name"
              placeholder="Digite o nome do produto"
          />
      </div>
      <div class="inputContainer">
          <input
              type="submit"
              class="inputSubmitButton"
              value="Enviar dados"
          />
      </div>
  </form>
  <hr />
  <h2>Items cadastrados</h2>
  <div>
          <ul>
            <li 
              v-for="(wishlistItem, index) in wishlistsItems" 
              :key="index">{{ wishlistItem.name }}

              <select name="status" class="status" @change="updatedWishlistItem($event, wishlistItem.id)">
                <option value="">Selecione...</option>
                <option v-for="s in status"
                :key="s.id"
                :selected="wishlistItem.status == s.tipo"
                :value="s.tipo">{{ s.tipo }}</option>
              </select> 
              <button class="deleteBtn" @click="deleteWishlistItem(wishlistItem.id)">Excluir</button>
            </li>
          </ul>
        </div>
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
        
        console.log(this.wishlistsItems)
      },
      async getStatus(){

        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()
        this.status = data

        //console.log(this.status)
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
        const req = await fetch(`http://localhost:3000/wishlistsItems/${id}`,{
            method: "DELETE"
        })
        await req.json()
        
        alert("Tem certeza?")

        this.message = 'Produto EXCLUIDO com sucesso'
        setTimeout(() => this.message = "", 3000)

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