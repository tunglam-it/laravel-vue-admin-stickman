<template>
  <AppHeader />
  <div class="container-fluid">
    <div class="row">
      <AppSidebar />
      <!-- Phần content -->
      <main role="main" class="col-md-10 ml-sm-auto col-lg-10 bg-main p-0">
        <div class="bg-white py-3 mb-3 px-4 text-primary">
          <h6 class="fw-bold">Items</h6>
        </div>
        <div class="px-4">
          <div class="row">
            <div class="row mb-2">
              <div class="col-md-2">Name: </div>
              <div class="col-md-2">Type: </div>
              <div class="col-md-2">Rarity: </div>
            </div>
            <div class="row pe-0">
              <div class="col-md-2">
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-wrench"></i></span>
                  <input class="form-control me-2" placeholder="Nhập tên item" v-model="name" type="text"
                    @change="searchItem">
                </div>
              </div>
              <div class="col-md-2">
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-coins"></i></span>
                  <select class="form-select" v-model="typeItem" @change="searchItem">
                    <option v-for="type in types" :value="type.id">{{ type.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-2">
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-r"></i></span>
                  <select class="form-select" v-model="rarityItem" @change="searchItem">
                    <option v-for="rare in rarity" :value="rare.id">{{ rare.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-2">
                <button class="btn btn-outline-primary" @click="resetSearch">
                  <i class="fa-solid fa-eraser me-2"></i>Clear
                </button>
              </div>
              <div class="col-md-4 p-0">
                <router-link class="btn btn-success float-end " to="/create-item">+</router-link>
              </div>
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
                        <td colspan="12" class="text-center fw-bold" v-if="this.items.data.length < 1">Items Not Found</td>
                      </tr>
                      <tr v-for="item in this.items.data">
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
                            type="button" class="btn btn-sm btn-primary me-2"><i class="fa-regular fa-pen-to-square"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="deleteItem(item.id)"><i
                              class="fa-regular fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="d-inline-flex align-items-center mt-2">
                <span class="me-4 fw-bold text-black">Display: {{ this.items.to }} items of Total: {{ this.items.total }}
                  items</span>
                <Pagination :pagination="items" @paginate="searchItem()" :offset="4" />
              </div>

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
          <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel">
            <i class="fa-solid fa-pencil"></i>
            Edit item
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Name:</label>
              <input v-model="this.item_selected.name" type="text" class="form-control">
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label class="col-form-label">Type:</label>
                <select class="form-select" v-model="this.item_selected.type">
                  <option v-for="type in getTypes()" :value="type.id">{{ type.name }}</option>
                </select>
              </div>
              <div class="mb-3 col-md-6">
                <label class="col-form-label">Rarity:</label>
                <select class="form-select" v-model="this.item_selected.rarity">
                  <option v-for="rare in getRarity()" :value="rare.id">{{ rare.name }}</option>
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
                <input v-model="this.item_selected.price_increment" type="number" class="form-control"
                  id="price_increment">
              </div>
              <div class="mb-3 col-md-4">
                <label for="max_level" class="col-form-label">Max Level:</label>
                <input v-model="this.item_selected.max_level" type="number" class="form-control" id="max_level">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" @click="approveEditItem(this.item_selected)"
            data-bs-dismiss="modal">
            <i class="fa-solid fa-floppy-disk me-2"></i>Save
          </button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            <i class="fa-solid fa-arrow-left me-2"></i>Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient.js";
import getAttributeName from "../../mixins/getAttributeName.js";
import types from "../../attributes/TypeItem.js";
import rarity from "../../attributes/RarityItem.js";
import Pagination from "../Pagination.vue";

export default {
  name: "ItemList",
  components: { Pagination, AppSidebar, AppHeader, AppFooter },
  mixins: [getAttributeName],
  props: {
    items: {},
  },
  data() {
    return {
      name: '',
      item_selected: {},
      types: types,
      rarity: rarity,
      typeItem: '',
      rarityItem: ''
    }
  },
  methods: {

    /***
     * call emit searchItem
     */
    searchItem() {
      this.$emit('searchItem', this.name, this.typeItem, this.rarityItem)
    },

    /***
     * call api to edit item
     * @param item_id
     * @return mixed
     */
    editItem(item_id) {
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
    deleteItem(id) {
      this.$emit('deleteItem', id)
    },

    /***
     * call emit approveEditItem
     * @param item_selected
     */
    approveEditItem(item_selected) {
      this.$emit('approveEditItem', item_selected)
    },

    /***
     * reset value in input search
     */
    resetSearch() {
      this.name = ''
      this.rarityItem = ''
      this.typeItem = ''
      this.searchItem()
    }
  }
}
</script>
