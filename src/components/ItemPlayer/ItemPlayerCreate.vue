<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-10 ml-sm-auto col-lg-10 bg-main px-3 py-3">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <Form @submit="giveItemForUser">
                <div class="card-header text-primary">
                  <i class="fa-solid fa-pencil me-1"></i>
                  <span class="fw-bold">Add item for user</span>
                </div>
              <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Item</label>
                    <VueMultiselect
                        v-model="info.itemRawId"
                        :options="itemOptions"
                        :custom-label="nameWithTypeAndRarity"
                        placeholder="Select one"
                        label="name"
                        track-by="id">
                    </VueMultiselect>
                    <label class="danger text-danger" v-show="isInvalid">Both Field is required</label>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Player</label>
                    <VueMultiselect
                        name="item"
                        v-model="info.userId"
                        :options="playerOptions"
                        :custom-label="nameWithLevel"
                        placeholder="Select one"
                        label="name"
                        track-by="id">
                    </VueMultiselect>
                    <label class="danger text-danger" v-show="isInvalid">Both Field is required</label>
                  </div>
              </div>
              <div class="card-footer text-center">
                <button type="submit" class="btn btn-primary me-2"><i class="fa-solid fa-floppy-disk me-2"></i>Save</button>
                <button class="btn btn-outline-primary me-2"><i class="fa-solid fa-arrow-left me-2"></i>Cancel</button>
              </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <AppFooter/>
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import getAttributeName from "../../mixins/getAttributeName.js";
import axiosClient from "../../axiosClient.js";
import {Field, Form, ErrorMessage} from 'vee-validate';
import VueMultiselect from 'vue-multiselect'
import {computed, onBeforeMount, reactive, ref} from "vue";

const emit = defineEmits(['giveItemForUser'])
const itemOptions = ref([])
const playerOptions = ref([])
const info = reactive({
  itemRawId: '',
  userId: ''
})
const { getTypeName, getRarityName} = getAttributeName()
const isInvalid = computed(()=>{
  return !info.itemRawId || !info.userId ;
})
onBeforeMount(()=>{
  getAllItems()
  getAllUser()
})
/***
 * get all items
 */
const getAllItems=()=>{
  axiosClient.get('/player/get-all-item-info1')
      .then(({data})=>{
        for (let i = 0; i < data.length; i++) {
          let item = {
            id: data[i].id,
            name: data[i].name,
            rarity: getRarityName(data[i].rarity),
            type: getTypeName(data[i].type)
          }
          itemOptions.value.push(item)
        }
      })
}

/***
 * multiselect items
 * @param name
 * @param type
 * @param rarity
 * @return {string}
 */
const nameWithTypeAndRarity=({ name, type, rarity })=> {
  return `Name: ${name} - Type: ${type} - Rarity: ${rarity}`
}

/***
 * get all users except admin
 */
const getAllUser=()=>{
  axiosClient.get('/admin/get-all-users1')
      .then(({data})=>{
        for (let i = 0; i < data.length; i++) {
          let player = {
            id: data[i].id,
            name: data[i].username,
            level: data[i].level
          }
          playerOptions.value.push(player)
        }
      })
      .catch(err=>{
        console.log(err)
      })
}

/***
 * multiselect players
 * @param name
 * @param level
 * @return {string}
 */
const nameWithLevel=({ name, level })=> {
  return `Username: ${name} - Level: ${level}`
}

/***
 * call emit to giveItemForUser
 */
const giveItemForUser=()=>{
  emit('giveItemForUser', info)
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>


