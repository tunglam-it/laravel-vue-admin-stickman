<template>
  <ItemList :items="items" @deleteItem="deleteItem" @searchItem="searchItem" @approveEditItem="approveEditItem"/>
</template>

<script setup>
import ItemList from "../../../components/Item/ItemList.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";
import {onBeforeMount, ref} from "vue";
import Swal from "sweetalert2";

const items = ref({})
const {notifyAPI} = notifyPopup()

onBeforeMount(() => {
  searchItem()
})

/***
 *
 * @param name
 * @param type
 * @param rarity
 */
const searchItem = (name = '', type = '', rarity = '') => {
  axiosClient.get(`/player/get-all-item-info?page=${items.value.current_page}&name=${name}&rarity=${rarity}&type=${type}`)
      .then(({data}) => {
        items.value = data.data
      }).catch(err => {
    console.log(err)
  })
}

/***
 * approve to update attribute item
 * @param item_selected
 */
const approveEditItem = (item_selected) => {
  axiosClient.put(`/admin/update-item-info/${item_selected.id}`, item_selected)
      .then(() => {
        notifyAPI('success', "Success !!!")
        searchItem()
      })
      .catch(() => {
        notifyAPI('error', "Failed !!!!")
        searchItem()
      })
}

/***
 * confirm to delete item
 * @param id
 */
const deleteItem = (id) => {
  Swal.fire({
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
          .then(() => {
            searchItem()
            Swal.fire(
                'Deleted Success !!!',
                'Item removed',
                'success'
            )
          })
          .catch(() => {
            Swal.fire(
                'Deleted Failed !!!',
                'Item not removed',
                'error'
            )
          })
    }
  })
}
</script>