<template>
    <h1>Dashboard Wishlists</h1>
    <WishlistsNotify :message="message" v-show="message" />
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Nome
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          CPF
        </th>
        <th class="text-left">
          Telefone
        </th>
        <th class="text-left">
          Produtos Selecionados
        </th>
        <th class="text-left">
          Ações
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="wishlist in wishlists"
        :key="wishlist.id"
      >
        <td>{{ wishlist.id }}</td>
        <td>{{ wishlist.name }}</td>
        <td>{{ wishlist.email }}</td>
        <td>{{ wishlist.vat }}</td>
        <td>{{ wishlist.phoneNumber }}</td>
        <td>
          <ul>
            <li 
              v-for="(wishlistItem, index) in wishlist.wishlistItems" 
              :key="index">{{ wishlistItem }}</li>
          </ul>
        </td>
        <td>
          <select name="status" class="status" @change="updatedWishlist($event, wishlist.id)">
            <option value="">Selecione...</option>
            <option v-for="s in status"
            :key="s.id"
            :selected="wishlist.status == s.tipo"
            :value="s.tipo">{{ s.tipo }}</option>
          </select> 
          <button class="deleteBtn" @click="deleteWishlist(wishlist.id)">Cancelar</button>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import WishlistsNotify from '@/components/WishlistsNotify.vue'

export default {
  name: 'WishlistListDash',
  components:{
      WishlistsNotify
    },
  data(){
    return{
      wishlists: null,
      wishlistId: null,
      status: [],
      message: null
    }
  },
  methods: {
    async getWishlists(){

      const req = await fetch('http://localhost:3000/wishlists')
      const data = await req.json()
      this.wishlists = data
      
      this.getStatus()
    },
    async getStatus(){

    const req = await fetch('http://localhost:3000/status')
    const data = await req.json()
    this.status = data

    },
    async updatedWishlist(event, id){
      const option = event.target.value
      const dataJson = JSON.stringify({ status: option })
      const req = await fetch(`http://localhost:3000/wishlists/${id}`,{
          method: "PATCH",
          headers: {"Content-type" : "application/json" },
          body: dataJson
      })
      await req.json()
      
      this.message = 'Produto ATUALIZADO com sucesso'
      setTimeout(() => this.message = "", 3000)

      this.getWishlists()
    },
    async deleteWishlist(id){
      if(confirm("Tem certeza?")){
        const req = await fetch(`http://localhost:3000/wishlists/${id}`,{
            method: "DELETE"
        })
        await req.json()
        
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.message = 'Produto EXCLUIDO com sucesso'
        setTimeout(() => this.message = "", 3000)
      }
      this.getWishlists()
    }
  },
  mounted() {
    this.getWishlists()
  }
}
</script>

<style scoped>
  #wishlistsTable {
    margin: 0 auto;
    max-width: 1200px;
  }

  #wishlistsTableHeading ,
  .wishlistsTableRow,
  .wishlistsTableRows{
    display: flex;
    flex-wrap: wrap;
  }

  #wishlistsTableHeading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .wishlistsTableRow{
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #wishlistsTableHeading div,
  .wishlistsTableRow div {
    width: 16%;
  }

  #wishlistsTableHeading .wishlistsId,
  .wishlistsTableRow .wishlistsNumber {
    width: 2%;
  }



  .deleteBtn {
    margin: 0 auto;
    cursor: pointer;
  }
  
  .deleteBtn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>
