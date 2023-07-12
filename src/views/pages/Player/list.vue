<template>
  <PlayerList :users="users" @searchInfo="getAllUser" @approveEditUser="approveEditUser"
              @deleteUser="deleteUser"/>
</template>

<script setup>
import PlayerList from '../../../components/Player/PlayerList.vue'
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";

const {notifyAPI} = notifyPopup()
const users = ref({})
const router = useRouter()

onBeforeMount(() => {
  getAllUser()
})
/***
 * get all users info and search
 * @return mixed
 */
const getAllUser = (username = '', start_date = '', end_date = '', start_level = '', end_level = '', start_gold = '', end_gold = '', start_diamonds = '', end_diamonds = '', status = '') => {
  axiosClient.get(`/admin/get-all-users?page=${users.value.current_page}&username=${username}&start_date=${start_date}&end_date=${end_date}&status=${status}
      &start_gold=${start_gold}&end_gold=${end_gold}&start_level=${start_level}&end_level=${end_level}&start_diamonds=${start_diamonds}&end_diamonds=${end_diamonds}`)
      .then(({data}) => {
        users.value = data.data
      }).catch(() => {
    localStorage.removeItem('token')
    router.push('/login')
    window.location.reload()
  })
}

/***
 * confirm to update user info
 * @param user_selected
 * @return mixed
 */
const approveEditUser = (user_selected) => {
  axiosClient.put(`/admin/update-user/${user_selected.id}`, user_selected)
      .then(() => {
        getAllUser()
        notifyAPI('success', 'Success !!!')
      })
      .catch(() => {
        notifyAPI('error', 'Failed !!!')
      })
}

/***
 * delete user by id
 * @param id
 * @return mixed
 */
const deleteUser = (id) => {
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
      axiosClient.delete(`/admin/delete-user/${id}`)
          .then(() => {
            getAllUser()
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