<template>
  <div id="wishlistsTable">
    <WishlistsNotify :message="message" v-show="message" />
    <div>
      <div id="wishlistsTableHeading">
        <div class="wishlistsId">
          #
        </div>
        <div>
          Nome
        </div>
        <div>
          Email 
        </div>
        <div>
          CPF
        </div>
        <div>
          Telefone 
        </div>
        <div>
          WishlistsItems
        </div>
        <div>
          Acoes
        </div>
      </div>
      <div id="wishlistsTableRows">
        <div class="wishlistsTableRow" 
          v-for="wishlist in wishlists" :key="wishlist.id"
        >
          <div class="wishlistsNumber">
            {{ wishlist.id }}
          </div>
          <div>
            {{ wishlist.name }}
        </div>
        <div>
          {{ wishlist.email }}
        </div>
        <div>
          {{ wishlist.vat }}
        </div>
        <div>
          {{ wishlist.phoneNumber }}
        </div>
        <div>
          <ul>
            <li 
              v-for="(wishlistItem, index) in wishlist.wishlistItems" 
              :key="index">{{ wishlistItem }}</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updatedWishlist($event, wishlist.id)">
            <option value="">Selecione...</option>
            <option v-for="s in status"
            :key="s.id"
            :selected="wishlist.status == s.tipo"
            :value="s.tipo">{{ s.tipo }}</option>
          </select> 
          <button class="deleteBtn" @click="deleteWishlist(wishlist.id)">Cancelar</button>
        </div>
        </div>
      </div>
    </div>
  </div>
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
      
      //console.log(this.wishlists)
      this.getStatus()
    },
    async getStatus(){

    const req = await fetch('http://localhost:3000/status')
    const data = await req.json()
    this.status = data

    //console.log(this.status)
    },
    async updatedWishlist(event, id){
      const option = event.target.value
      console.log(option)
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
      const req = await fetch(`http://localhost:3000/wishlists/${id}`,{
          method: "DELETE"
      })
      await req.json()
      
      alert("Tem certeza?")

      this.message = 'Produto EXCLUIDO com sucesso'
      setTimeout(() => this.message = "", 3000)

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
