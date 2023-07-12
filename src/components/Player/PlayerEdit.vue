<template>
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel"><i class="fa-solid fa-pencil"></i>
               Edit player</h1>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <form>
               <div class="mb-3">
                 <label class="col-form-label">Username:</label>
                 <input v-model="user_selected.username" type="text" class="form-control" disabled>
               </div>
               <div class="row">
                 <div class="mb-3 col-md-6">
                   <label for="gold" class="col-form-label">Gold:</label>
                   <input v-model="user_selected.gold" type="text" class="form-control" id="gold">
                 </div>
                 <div class="mb-3 col-md-6">
                   <label for="diamonds" class="col-form-label">Diamonds:</label>
                   <input v-model="user_selected.diamonds" type="text" class="form-control" id="diamonds">
                 </div>
               </div>
               <div class="row">
                 <div class="mb-3 col-md-6">
                   <label for="exp-profile" class="col-form-label">Exp:</label>
                   <input v-model="user_selected.exp_profile" type="text" class="form-control" id="exp-profile">
                 </div>
                 <div class="mb-3 col-md-6">
                   <label for="energy" class="col-form-label">Energy:</label>
                   <input v-model="user_selected.energy" type="text" class="form-control" id="energy">
                 </div>
               </div>
             </form>
           </div>
           <div class="modal-footer justify-content-center">
             <button type="button" class="btn btn-primary" @click="approveEditUser(user_selected)"
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
   
   const props = defineProps({
      user_selected: String
   })
   const emit = defineEmits(['approveEditUser'])
   /***
    * call emit to update user attributes
    */
    const approveEditUser= ()=> {
     emit('approveEditUser', props.user_selected)
   }
   </script>