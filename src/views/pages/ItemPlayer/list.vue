<template>
  <ItemPlayerList @searchItemPlayer="searchItemPlayer" :items="items" @deleteItemUser="deleteItemUser"/>
</template>

<script setup>
import ItemPlayerList from "../../../components/ItemPlayer/ItemPlayerList.vue";
import axiosClient from "../../../axiosClient.js";
import {onBeforeMount, ref} from "vue";
import Swal from "sweetalert2";

const items = ref({})
onBeforeMount(() => {
  searchItemPlayer()
})
/***
 * get all item of user
 */
const searchItemPlayer = (playerName = '', itemName = '', status = '', rarityItem = '', typeItem = '', start_level = '', end_level = '') => {
  axiosClient.get(`/player/get-all-item-users?page=${items.value.current_page}&playerName=${playerName}&status=${status}&itemName=${itemName}&rarityItem=${rarityItem}&typeItem=${typeItem}&start_level=${start_level}&end_level=${end_level}`)
      .then(({data}) => {
        items.value = data.data
      })
      .catch(err => {
        console.log(err)
      })
}

/***
 * delete item of user by itemUserId
 * @param id
 * @return mixed
 */
const deleteItemUser = (id) => {
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
      axiosClient.delete(`/admin/delete-item-user/${id}`)
          .then(() => {
            searchItemPlayer()
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