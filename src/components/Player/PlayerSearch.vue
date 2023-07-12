<template>
   <div class="row g-3 align-items-center mb-2">
      <div class="col-auto">Status:</div>
      <div class="col-auto">
         <input name="status" type="radio" v-model="status" id="all" class="form-check-input" value=""
            @change="searchInfo">
         <label for="all" class="form-check-label ms-2">All</label>
      </div>
      <div class="col-auto">
         <input name="status" type="radio" v-model="status" id="status1" class="form-check-input" value="1"
            @change="searchInfo">
         <label for="status1" class="form-check-label ms-2">Active</label>
      </div>
      <div class="col-auto">
         <input name="status" type="radio" v-model="status" id="status2" class="form-check-input" value="2"
            @change="searchInfo">
         <label for="status2" class="form-check-label ms-2">Unactive</label>
      </div>
   </div>
   <div class="row mb-1">
      <div class="col-md-2">Username:</div>
      <div class="col-md-4">Date:</div>
      <div class="col-md-4">Gold:</div>
   </div>
   <div class="row">
      <div class="col-md-2">
         <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <input class="form-control me-2" placeholder="Nhập username" v-model="username" type="text"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-regular fa-calendar-days"></i></span>
            <input class="form-control me-2" v-model="start_date" type="date" @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-regular fa-calendar-days"></i></span>
            <input class="form-control me-2" placeholder="Nhập username để tìm kiếm" v-model="end_date" type="date"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-solid fa-coins"></i></span>
            <input placeholder="Start Gold" class="form-control me-2" v-model="start_gold" type="number"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-solid fa-coins"></i></span>
            <input placeholder="End Gold" class="form-control me-2" v-model="end_gold" type="number" @change="searchInfo">
         </div>
      </div>
   </div>
   <div class="row mb-1">
      <div class="col-md-4">Level:</div>
      <div class="col-md-4">Diamonds:</div>
   </div>
   <div class="row">
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold">Lv</span>
            <input placeholder="Start Level" class="form-control me-2" v-model="start_level" type="number"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold">Lv</span>
            <input placeholder="End Level" class="form-control me-2" v-model="end_level" type="number"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-solid fa-gem"></i></span>
            <input placeholder="Start Diamonds" class="form-control me-2" v-model="start_diamonds" type="number"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <div class="input-group mb-3 m-0">
            <span class="input-group-text fw-bold"><i class="fa-solid fa-gem"></i></span>
            <input placeholder="End Diamonds" class="form-control me-2" v-model="end_diamonds" type="number"
               @change="searchInfo">
         </div>
      </div>
      <div class="col-md-2">
         <button class="btn btn-outline-primary" @click="resetSearch"><i class="fa-solid fa-eraser me-2"></i>Clear
         </button>
      </div>
      <div class="col-md-2">
         <router-link class="btn btn-success float-end" to="/create-user">+</router-link>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';


const username = ref('')
const start_date = ref('')
const end_date = ref('')
const start_level = ref('')
const end_level = ref('')
const start_gold = ref('')
const end_gold = ref('')
const start_diamonds = ref('')
const end_diamonds = ref('')
const status = ref('')

const emit = defineEmits(['searchInfo'])
/***
 * call emit searchInfo
 */
const searchInfo = () => {
   emit('searchInfo', username.value, start_date.value, end_date.value, start_level.value, end_level.value, start_gold.value, end_gold.value, start_diamonds.value, end_diamonds.value, status.value)
}

/***
 * reset value search
 */
const resetSearch = () => {
   username.value = ''
   start_date.value = ''
   end_date.value = ''
   status.value = ''
   start_level.value = ''
   end_level.value = ''
   start_diamonds.value = ''
   end_diamonds.value = ''
   start_gold.value = ''
   end_gold.value = ''
   searchInfo()
}
</script>