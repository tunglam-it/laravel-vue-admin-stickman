<template>
  <ItemList :items="items" @confirmDelete="confirmDelete" @searchItem="searchItem" @approveEditItem="approveEditItem"/>
</template>

<script>
import ItemList from "../../../components/Item/ItemList.vue";
import axiosClient from "../../../axiosClient.js";

export default {
  name: "ListItem",
  components: {ItemList},
   data(){
    return {
      items:{}
    }
   },
   created() {
    this.searchItem()
   },
  methods:{
    searchItem(name=''){
      axiosClient.get(`/player/get-all-item-info?name=${name}`)
      .then(res=>{
        this.items = res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },

    approveEditItem(item_selected){
      axiosClient.put(`/player/update-item-info/${item_selected.id}`, item_selected)
      .then(res=>{
        this.searchItem()
      })
      .catch(err=>{
        console.log(err)
      })
    },

    /***
     * confirm to delete item
     * @param id
     */
    confirmDelete(id){
      if (confirm('Are you sure delete this user?')) {
        this.deleteItem(id)
      }
    },

    /***
     * delete item
     * @param id
     */
    deleteItem(id){
      axiosClient.delete(`/player/delete-item/${id}`)
      .then(res=>{
        this.searchItem()
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>