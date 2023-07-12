<template>
  <AppHeader />
  <div class="container-fluid">
    <div class="row">
      <AppSidebar />
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 bg-main p-0">
        <div class="bg-white py-3 mb-3 px-4 text-primary">
          <h6 class="fw-bold">Items Users</h6>
        </div>
        <div class="px-4 pb-3">
          <i class="fa-solid fa-chevron-down me-2 text-primary"></i>
          <span class="fw-bold">Search Criteria</span>
        </div>
        <div class="px-4">

          <ItemPlayerSearch @searchItemPlayer="searchItemPlayer" />

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
                        <td colspan="12" class="text-center fw-bold" v-if="props.items.data.length < 1">Items Not Found</td>
                      </tr>
                      <tr v-for="item in props.items.data">
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

              <Pagination :pagination="items" @paginate="searchItemPlayer()" :offset="4" />

            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import getAttributeName from "../../mixins/getAttributeName.js";
import types from "../../attributes/TypeItem.js";
import rarity from "../../attributes/RarityItem.js";
import Pagination from "../Pagination.vue";
import ItemPlayerSearch from "./ItemPlayerSearch.vue";
import { reactive, ref } from 'vue'

const { getTypeName, getRarityName } = getAttributeName()
const props = defineProps({
  items: Object
})
const emit = defineEmits(['searchItemPlayer', 'deleteItemUser'])

/***
 * call emit to searchItemPlayer
 */
const searchItemPlayer = (playerName, itemName, status, rarityItem, typeItem, start_level, end_level) => {
  emit('searchItemPlayer', playerName, itemName, status, rarityItem, typeItem, start_level, end_level)
}

/***
 * call emit to confirmDelete
 * @param id
 */
const deleteItemUser = (id) => {
  emit('deleteItemUser', id)
}

/***
 * get name of status
 * @param status
 * @return {string}
 */
const getStatusName = (status) => {
  if (status == 2) return 'UnEquipped'
  if (status == 1) return 'Equipped'
}


</script>