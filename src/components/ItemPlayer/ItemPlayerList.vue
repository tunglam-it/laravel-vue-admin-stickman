<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 bg-main p-0">
        <div class="bg-white py-3 mb-3 px-4 text-primary">
          <h6 class="fw-bold">Items Users</h6>
        </div>
        <div class="px-4">
          <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">Status:</div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="all" class="form-check-input" value=""
                     @change="searchItemPlayer">
              <label for="all" class="form-check-label ms-2">All</label>
            </div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="status1" class="form-check-input" value="1"
                     @change="searchItemPlayer">
              <label for="status1" class="form-check-label ms-2"> Equipped</label>
            </div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="status2" class="form-check-input" value="2"
                     @change="searchItemPlayer">
              <label for="status2" class="form-check-label ms-2"> UnEquipped</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">Username:</div>
            <div class="col-md-2">Item name:</div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text">@</span>
                <input class="form-control me-2" placeholder="Nhập username" v-model="playerName"
                       type="text" @change="searchItemPlayer">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text">@</span>
                <input class="form-control me-2" placeholder="Nhập tên item " v-model="itemName" type="text"
                       @change="searchItemPlayer"></div>
            </div>

          </div>
          <div class="row">
            <div class="col-md-2">Rarity:</div>
            <div class="col-md-2">Type:</div>
            <div class="col-md-4">Level:</div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-r"></i></span>
                <select class="form-select" v-model="rarityItem" @change="searchItemPlayer">
                  <option v-for="rare in rarity" :value="rare.id">{{ rare.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-coins"></i></span>
                <select class="form-select" v-model="typeItem" @change="searchItemPlayer">
                  <option v-for="type in types" :value="type.id">{{ type.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text fw-bold">Lv</span>
                <input class="form-control me-2" placeholder="Nhập level start " v-model="start_level"
                       type="text" @change="searchItemPlayer">              </div>

            </div>
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text fw-bold" >Lv</span>
                <input class="form-control me-2" placeholder="Nhập level end " v-model="end_level"
                       type="text" @change="searchItemPlayer">
              </div>
            </div>
            <div class="col-md-2">
              <button class="btn btn-outline-primary" @click="resetSearch">
                <i class="fa-solid fa-eraser me-2"></i>Clear
              </button>
            </div>
            <div class="col-md-2">
              <router-link class="btn btn-success float-end" to="/create-item-user">+</router-link>
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
                      <td colspan="12" class="text-center fw-bold" v-if="this.items.data.length<1">Items Not Found</td>
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
                <span class="me-4 fw-bold text-black">Display: {{ this.items.to }} users of Total: {{
                    this.items.total
                  }} users</span>
                <Pagination :pagination="items" @paginate="searchItemPlayer()" :offset="4"/>
              </div>

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
  mixins: [getAttributeName],
  name: "ItemPlayerList",
  props: {
    items: {}
  },
  data() {
    return {
      types: types,
      rarity: rarity,
      itemName: '',
      playerName: '',
      status: '',
      rarityItem: '',
      typeItem: '',
      start_level: '',
      end_level: '',

    }
  },
  methods: {
    /***
     * call emit to searchItemPlayer
     */
    searchItemPlayer() {
      this.$emit('searchItemPlayer', this.playerName, this.itemName, this.status, this.rarityItem, this.typeItem, this.start_level, this.end_level)
    },

    /***
     * call emit to confirmDelete
     * @param id
     */
    deleteItemUser(id) {
      this.$emit('deleteItemUser', id)
    },

    /***
     * get name of status
     * @param status
     * @return {string}
     */
    getStatusName(status) {
      if (status == 2) return 'UnEquipped'
      if (status == 1) return 'Equipped'
    },

    /***
     * reset input search
     */
    resetSearch() {
      this.itemName = ''
      this.playerName = ''
      this.status = ''
      this.rarityItem = ''
      this.typeItem = ''
      this.start_level = ''
      this.end_level = ''
      this.searchItemPlayer()
    }
  }

}
</script>