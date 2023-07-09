<template>
  <ItemList :items="items" @deleteItem="deleteItem" @searchItem="searchItem" @approveEditItem="approveEditItem"/>
</template>

<script>
import ItemList from "../../../components/Item/ItemList.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";

export default {
  name: "ListItem",
  components: {ItemList},
  mixins:[notifyPopup],
   data(){
    return {
      items:{}
    }
   },
   created() {
    this.searchItem()
   },
  methods:{
    /***
     *
     * @param name
     * @param type
     * @param rarity
     */
    searchItem(name='', type='', rarity=''){
      axiosClient.get(`/player/get-all-item-info?page=${this.items.current_page}&name=${name}&rarity=${rarity}&type=${type}`)
      .then(({data})=>{
        this.items = data.data
        console.log(this.items)
      }).catch(err=>{
        console.log(err)
      })
    },

    /***
     *
     * @param item_selected
     */
    approveEditItem(item_selected){
      axiosClient.put(`/admin/update-item-info/${item_selected.id}`, item_selected)
      .then(()=>{
        this.notifyAPI('success', "Success !!!")
        this.searchItem()
      })
      .catch(err=>{
        this.notifyAPI('error', "Failed !!!!")
      })
    },

    /***
     * confirm to delete item
     * @param id
     */
    deleteItem(id){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axiosClient.delete(`/admin/delete-item/${id}`)
          .then(()=>{
            this.searchItem()
            this.$swal.fire(
                'Deleted Success !!!',
                'Item removed',
                'success'
            )
          })
          .catch(()=>{
            this.$swal.fire(
                'Deleted Failed !!!',
                'Item not removed',
                'error'
            )
          })
        }
      })
    },
  }
}
</script>