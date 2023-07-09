<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
            class=" d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h4 class="fw-bold">Thông tin Items của Player</h4>
        </div>

        <div class="row">
          <div class="col-md-4 mb-2">
            <input class="form-control me-2" placeholder="Nhập username" v-model="playerName"
                   type="text" @change="searchItemPlayer">
          </div>
          <div class="col-md-4 mb-2">
            <input class="form-control me-2" placeholder="Nhập tên item " v-model="itemName"
                   type="text" @change="searchItemPlayer">
          </div>
          <div class="col-md-1 mb-2 justify-content-end">
            <router-link class="btn btn-success" to="/create-item-user">+</router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card mt-2">
              <div class="card-body">
                <table class="table table-hover table-responsive">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Player</th>
                    <th scope="col">Item</th>
                    <th scope="col">ATK</th>
                    <th scope="col">Head Def</th>
                    <th scope="col">Body Def</th>
                    <th scope="col">HP</th>
                    <th scope="col">Rarity</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Level</th>
                    <th scope="col" class="text-center">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td colspan="12" v-if="this.items.length<1">Items Not Found</td>
                  </tr>
                  <tr v-for="item in this.items.data">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.player.username }}</td>
                    <td>{{ item.item.name }}</td>
                    <td>{{ item.atk }}</td>
                    <td>{{ item.head_def }}</td>
                    <td>{{ item.body_def }}</td>
                    <td>{{ item.hp }}</td>
                    <td>{{ getRarityName(item.item.rarity) }}</td>
                    <td>{{ getTypeName(item.item.type) }}</td>
                    <td>{{ getStatusName(item.status) }}</td>
                    <td>{{ item.current_level }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-danger" @click="deleteItemUser(item.id)">
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="d-inline-flex align-items-center mt-2">
              <span class="me-4 fw-bold text-black">Display: {{this.items.to}} users of Total: {{ this.items.total }} users</span>
              <Pagination :pagination="items" @paginate="searchItemPlayer()" :offset="4" />

            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
  <AppFooter/>
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import getAttributeName from "../../mixins/getAttributeName.js";
import types from "../../attributes/TypeItem.js";
import rarity from "../../attributes/RarityItem.js";
import Pagination from "../Pagination.vue";

export default {
  components: {AppSidebar, AppHeader, AppFooter, Pagination},
  mixins:[getAttributeName],
  name: "ItemPlayerList",
  props:{
    items:{}
  },
  data(){
    return{
      types:types,
      rarity: rarity,
      itemName:'',
      playerName:'',
    }
  },
  methods:{
    /***
     * call emit to searchItemPlayer
     */
    searchItemPlayer(){
      this.$emit('searchItemPlayer', this.playerName, this.itemName)
    },

    /***
     * call emit to confirmDelete
     * @param id
     */
    deleteItemUser(id){
      this.$emit('deleteItemUser', id)
    },

    /***
     * get name of status
     * @param status
     * @return {string}
     */
    getStatusName(status){
      if(status==2)return 'UnEquipped'
      if(status==1)return 'Equipped'
    }
  }

}
</script>