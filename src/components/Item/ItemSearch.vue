<template>
   <div class="row">
     <div class="row mb-2">
       <div class="col-md-2">Item:</div>
       <div class="col-md-2">Type:</div>
       <div class="col-md-2">Rarity:</div>
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
             <option v-for="type in state.types" :value="type.id">{{ type.name }}</option>
           </select>
         </div>
       </div>
       <div class="col-md-2">
         <div class="input-group mb-3">
           <span class="input-group-text"><i class="fa-solid fa-r"></i></span>
           <select class="form-select" v-model="rarityItem" @change="searchItem">
             <option v-for="rare in state.rarity" :value="rare.id">{{ rare.name }}</option>
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
 </template>
 
 <script setup>
 
 import {reactive, ref} from "vue";
 import types from "../../attributes/TypeItem.js";
 import rarity from "../../attributes/RarityItem.js";
 
 const name = ref('')
 const rarityItem = ref('')
 const typeItem = ref('')
 const state = reactive({
   types:types,
   rarity:rarity
 })
 
 const emit = defineEmits(['searchItem'])
 
 const searchItem = ()=>{
   emit('searchItem', name.value, typeItem.value, rarityItem.value)
 }
 /***
  * reset value in input search
  */
 const resetSearch = () => {
   name.value = ''
   rarityItem.value = ''
   typeItem.value = ''
   searchItem()
 }
 </script>