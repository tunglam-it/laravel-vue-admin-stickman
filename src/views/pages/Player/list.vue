<template>
  <PlayerList :users="users" @searchInfo="getAllUser" @approveEditUser="approveEditUser"
              @confirmDelete="confirmDelete"/>
</template>

<script>
import PlayerList from '../../../components/Player/PlayerList.vue'
import axiosClient from "../../../axiosClient.js";

export default {
  name: 'List',
  components: {PlayerList},
  data() {
    return {
      users: {},
    }
  },
  created() {
    this.getAllUser()
  },
  methods: {

    /***
     * get all users info and search
     * @return mixed
     */
    async getAllUser(username = '', start_date = '', end_date = '', status = '') {
      await axiosClient.get(`/admin/get-all-users?username=${username}&start_date=${start_date}&end_date=${end_date}&status=${status}`)
          .then(res => {
            this.users = res.data.data
          }).catch(err => {
            console.log(err)
          })
    },

    /***
     * confirm to update user info
     * @param user_selected
     * @return mixed
     */
    async approveEditUser(user_selected) {
      await axiosClient.put(`/admin/update-user/${user_selected.id}`, user_selected)
          .then(res => {
            this.getAllUser()
          })
          .catch(err => {
            console.log(err)
          })
    },

    /***
     * confirm to delete user
     * @param id
     * @return mixed
     */
    confirmDelete(id) {
      if (confirm('Are you sure delete this user?')) {
        this.deleteUser(id)
      }
    },

    /***
     * delete user by id
     * @param id
     * @return mixed
     */
    async deleteUser(id) {
      await axiosClient.delete(`/admin/delete-user/${id}`)
          .then(res => {
            this.getAllUser()
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>