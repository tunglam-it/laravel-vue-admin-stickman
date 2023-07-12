<template>
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
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <input class="form-control me-2" placeholder="Nhập username" v-model="playerName" type="text"
               @change="searchItemPlayer">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-wrench"></i></span>
            <input class="form-control me-2" placeholder="Nhập tên item " v-model="itemName" type="text"
               @change="searchItemPlayer">
         </div>
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
               <option v-for="rare in state.rarity" :value="rare.id">{{ rare.name }}</option>
            </select>
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-coins"></i></span>
            <select class="form-select" v-model="typeItem" @change="searchItemPlayer">
               <option v-for="type in state.types" :value="type.id">{{ type.name }}</option>
            </select>
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3">
            <span class="input-group-text fw-bold">Lv</span>
            <input class="form-control me-2" placeholder="Nhập level start " v-model="start_level" type="text"
               @change="searchItemPlayer">
         </div>

      </div>
      <div class="col-md-2">
         <div class="input-group mb-3">
            <span class="input-group-text fw-bold">Lv</span>
            <input class="form-control me-2" placeholder="Nhập level end " v-model="end_level" type="text"
               @change="searchItemPlayer">
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
</template>

<script setup>
import { reactive, ref } from 'vue';
import types from '../../attributes/TypeItem.js';
import rarity from '../../attributes/RarityItem.js';


const status = ref('')
const playerName = ref('')
const itemName = ref('')
const rarityItem = ref('')
const typeItem = ref('')
const start_level = ref('')
const end_level = ref('')
const state = reactive({
   types: types,
   rarity: rarity
})

const emit = defineEmits(['searchItemPlayer'])

const searchItemPlayer = () => {
   emit('searchItemPlayer', playerName.value, itemName.value, status.value, rarityItem.value, typeItem.value, start_level.value, end_level.value)
}

/***
 * reset input search
 */
const resetSearch = () => {
   itemName.value = ''
   playerName.value = ''
   status.value = ''
   rarityItem.value = ''
   typeItem.value = ''
   start_level.value = ''
   end_level.value = ''
   searchItemPlayer()
}
</script>