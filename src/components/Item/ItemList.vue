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
        <div class="px-4 pb-2">
          <i class="fa-solid fa-chevron-down me-2 text-primary"></i>
          <span class="fw-bold">Search Criteria</span>
        </div>
        <div class="px-4">

          <ItemSearch @searchItem="searchItem" />
          
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
                        <td colspan="12" class="text-center fw-bold" v-if="props.items.data.length < 1">Items Not Found
                        </td>
                      </tr>
                      <tr v-for="item in props.items.data">
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
                          <div class="btn-group">
                            <button @click="editItem(item.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              type="button" class="btn btn-sm btn-primary"><i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" @click="deleteItem(item.id)"><i
                                class="fa-regular fa-trash-can"></i>
                            </button>
                          </div>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Pagination :pagination="items" @paginate="searchItem()" :offset="4" />

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <ItemEdit :item_selected="item_selected" @approveEditItem="approveEditItem" />

  <AppFooter />
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient.js";
import getAttributeName from "../../mixins/getAttributeName.js";
import Pagination from "../Pagination.vue";
import { ref } from 'vue';
import ItemSearch from "./ItemSearch.vue";
import ItemEdit from './ItemEdit.vue';

const item_selected = ref({})
const { getTypeName, getRarityName } = getAttributeName()

const props = defineProps({
  items: Object
})
const emit = defineEmits(['searchItem', 'deleteItem', 'approveEditItem'])
/***
 * call emit searchItem
 */
const searchItem = (name, typeItem, rarityItem) => {
  emit('searchItem', name, typeItem, rarityItem)
}

/***
 * call api to edit item
 * @param item_id
 * @return mixed
 */
const editItem = (item_id) => {
  axiosClient.get(`/player/get-item-info/${item_id}`)
    .then(res => {
      item_selected.value = res.data
    })
    .catch(err => {
      console.log(err)
    })
}

/***
 * confirm to delete user
 * @param id
 * @return mixed
 */
const deleteItem = (id) => {
  emit('deleteItem', id)
}

/***
 * call emit approveEditItem
 * @param item_selected
 */
const approveEditItem = (item_selected) => {
  emit('approveEditItem', item_selected)
}

</script>
