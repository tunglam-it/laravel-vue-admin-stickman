<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
            class=" d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h4 class="fw-bold">Thông tin Items Game</h4>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-4 mb-2">
                    <input class="form-control me-2" placeholder="Nhập tên item để tìm kiếm" v-model="name"
                           type="text" @change="searchItem">
                  </div>
                  <div class="col-md-1 mb-2 justify-content-end">
                    <router-link class="btn btn-success" to="/create-item">+</router-link>
                  </div>
                </div>

              </div>
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">ATK</th>
                    <th scope="col">Head Def</th>
                    <th scope="col">Body Def</th>
                    <th scope="col">HP</th>
                    <th scope="col">Rarity</th>
                    <th scope="col">Stat Increment</th>
                    <th scope="col">Price Increment</th>
                    <th scope="col">Max Level</th>
                    <th scope="col" class="text-center">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td colspan="5" v-if="this.items.length<1">Items Not Found</td>
                  </tr>
                  <tr v-for="item in this.items">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ getTypeName(item.type) }}</td>
                    <td>{{ item.atk }}</td>
                    <td>{{ item.head_def }}</td>
                    <td>{{ item.body_def }}</td>
                    <td>{{ item.hp }}</td>
                    <td>{{ getRarityName(item.rarity) }}</td>
                    <td>{{ item.stat_increment }}</td>
                    <td>{{ item.price_increment }}</td>
                    <td>{{ item.max_level }}</td>
                    <td>
                      <button @click="editItem(item.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              type="button" class="btn btn-sm btn-primary me-4"><i
                          class="fa-regular fa-pen-to-square me-3"></i>Edit
                      </button>
                      <button class="btn btn-sm btn-danger" @click="confirmDelete(item.id)"><i
                          class="fa-regular fa-trash-can me-3"></i>Delete
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="d-inline-flex align-items-center">
              <span class="me-4 fw-bold text-white">Total: {{ this.items.length }} items</span>
              <nav class="mt-2">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angles-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-chevron-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-chevron-right"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angles-right"></i></a></li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin item</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Name:</label>
              <input v-model="this.item_selected.name" type="text" class="form-control" disabled>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label class="col-form-label">Type:</label>
                <select class="form-select" v-model="this.item_selected.type">
                  <option v-for="type in getTypes()" :value="type.id">{{type.name}}</option>
                </select>
              </div>
              <div class="mb-3 col-md-6">
                <label  class="col-form-label">Rarity:</label>
                <select class="form-select" v-model="this.item_selected.rarity">
                  <option v-for="rare in getRarity()" :value="rare.id">{{rare.name}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="atk" class="col-form-label">ATK:</label>
                <input v-model="this.item_selected.atk" type="number" class="form-control" id="atk">
              </div>
              <div class="mb-3 col-md-6">
                <label for="hp" class="col-form-label">HP:</label>
                <input v-model="this.item_selected.hp" type="number" class="form-control" id="hp">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="body_def" class="col-form-label">Body Def:</label>
                <input v-model="this.item_selected.body_def" type="number" class="form-control" id="body_def">
              </div>
              <div class="mb-3 col-md-6">
                <label for="head_def" class="col-form-label">Head Def:</label>
                <input v-model="this.item_selected.head_def" type="number" class="form-control" id="head_def">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-4">
                <label for="stat_increment" class="col-form-label">Stat Increment:</label>
                <input v-model="this.item_selected.stat_increment" type="number" class="form-control" id="stat_increment">
              </div>
              <div class="mb-3 col-md-4">
                <label for="price_increment" class="col-form-label">Price Increment:</label>
                <input v-model="this.item_selected.price_increment" type="number" class="form-control" id="price_increment">
              </div>
              <div class="mb-3 col-md-4">
                <label for="max_level" class="col-form-label">Max Level:</label>
                <input v-model="this.item_selected.max_level" type="number" class="form-control" id="max_level">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="approveEditItem(this.item_selected)" data-bs-dismiss="modal">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <AppFooter/>
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient.js";
import getAttributeName from "../../mixins/getAttributeName.js";
import types from "../../attributes/TypeItem.js";
import rarity from "../../attributes/RarityItem.js";

export default {
  name: "ItemList",
  components: {AppSidebar, AppHeader, AppFooter},
  mixins:[getAttributeName],
  props: {
    items: {},
  },
  data() {
    return {
      name: '',
      item_selected: {},
      types:types,
      rarity:rarity
    }
  },
  methods:{

    /***
     * call emit searchItem
     */
    searchItem(){
      this.$emit('searchItem',this.name)
    },

    /***
     * call api to edit item
     * @param item_id
     * @return mixed
     */
    editItem(item_id){
      axiosClient.get(`/player/get-item-info/${item_id}`)
          .then(res => {
            this.item_selected = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    /***
     * confirm to delete user
     * @param id
     * @return mixed
     */
    confirmDelete(id){
      this.$emit('confirmDelete', id)
    },

    /***
     * call emit approveEditItem
     * @param item_selected
     */
    approveEditItem(item_selected){
      this.$emit('approveEditItem', item_selected)
    },
  }
}
</script>
