<template>
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
                 <input v-model="props.item_selected.name" type="text" class="form-control">
               </div>
               <div class="row">
                 <div class="mb-3 col-md-6">
                   <label class="col-form-label">Type:</label>
                   <select class="form-select" v-model="props.item_selected.type">
                     <option v-for="type in getTypes()" :value="type.id">{{ type.name }}</option>
                   </select>
                 </div>
                 <div class="mb-3 col-md-6">
                   <label class="col-form-label">Rarity:</label>
                   <select class="form-select" v-model="props.item_selected.rarity">
                     <option v-for="rare in getRarity()" :value="rare.id">{{ rare.name }}</option>
                   </select>
                 </div>
               </div>
               <div class="row">
                 <div class="mb-3 col-md-6">
                   <label for="atk" class="col-form-label">ATK:</label>
                   <input v-model="props.item_selected.atk" type="number" class="form-control" id="atk">
                 </div>
                 <div class="mb-3 col-md-6">
                   <label for="hp" class="col-form-label">HP:</label>
                   <input v-model="props.item_selected.hp" type="number" class="form-control" id="hp">
                 </div>
               </div>
               <div class="row">
                 <div class="mb-3 col-md-6">
                   <label for="body_def" class="col-form-label">Body Def:</label>
                   <input v-model="props.item_selected.body_def" type="number" class="form-control" id="body_def">
                 </div>
                 <div class="mb-3 col-md-6">
                   <label for="head_def" class="col-form-label">Head Def:</label>
                   <input v-model="props.item_selected.head_def" type="number" class="form-control" id="head_def">
                 </div>
               </div>
               <div class="row">
                 <div class="mb-3 col-md-4">
                   <label for="stat_increment" class="col-form-label">Stat Increment:</label>
                   <input v-model="props.item_selected.stat_increment" type="number" class="form-control" id="stat_increment">
                 </div>
                 <div class="mb-3 col-md-4">
                   <label for="price_increment" class="col-form-label">Price Increment:</label>
                   <input v-model="props.item_selected.price_increment" type="number" class="form-control"
                          id="price_increment">
                 </div>
                 <div class="mb-3 col-md-4">
                   <label for="max_level" class="col-form-label">Max Level:</label>
                   <input v-model="props.item_selected.max_level" type="number" class="form-control" id="max_level">
                 </div>
               </div>
             </form>
           </div>
           <div class="modal-footer justify-content-center">
             <button type="button" class="btn btn-primary" @click="approveEditItem(props.item_selected)"
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
   
   </template>
   
   <script setup>
   import getAttributeName from "../../mixins/getAttributeName.js";
   
   const {getTypes, getRarity} = getAttributeName()
   const emit = defineEmits(['approveEditItem'])
   const props = defineProps({
      item_selected: Object
   })
   /***
    * call emit approveEditItem
    * @param item_selected
    */
   const approveEditItem = (item_selected) => {
     emit('approveEditItem', props.item_selected)
   }
   </script>