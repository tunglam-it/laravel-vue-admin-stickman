<template>
  <PlayerList :users="users" @searchInfo="getAllUser" @approveEditUser="approveEditUser"
              @deleteUser="deleteUser"/>
</template>

<script>
import PlayerList from '../../../components/Player/PlayerList.vue'
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";

export default {
  name: 'ListPlayer',
  components: {PlayerList},
  mixins:[notifyPopup],
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
    async getAllUser(username= '', start_date='', end_date='', start_level='', end_level='', start_gold='', end_gold='', start_diamonds='', end_diamonds='', status='',) {
      await axiosClient.get(`/admin/get-all-users?page=${this.users.current_page}&username=${username}&start_date=${start_date}&end_date=${end_date}&status=${status}
      &start_gold=${start_gold}&end_gold=${end_gold}&start_level=${start_level}&end_level=${end_level}&start_diamonds=${start_diamonds}&end_diamonds=${end_diamonds}`)
          .then(({data}) => {
            this.users = data.data
          }).catch(() => {
            localStorage.removeItem('token')
            this.$router.push('/login')
            window.location.reload()
          })
    },

    /***
     * confirm to update user info
     * @param user_selected
     * @return mixed
     */
    async approveEditUser(user_selected) {
      await axiosClient.put(`/admin/update-user/${user_selected.id}`, user_selected)
          .then(() => {
            this.getAllUser()
            this.notifyAPI('success', 'Success !!!')
          })
          .catch(() => {
            this.notifyAPI('error', 'Failed !!!')
          })
    },

    /***
     * delete user by id
     * @param id
     * @return mixed
     */
    async deleteUser(id) {
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
          axiosClient.delete(`/admin/delete-user/${id}`)
            .then(() => {
              this.getAllUser()
              this.$swal.fire(
                  'Deleted Success !!!',
                  'Item removed',
                  'success'
              )
            })
            .catch(() => {
              this.$swal.fire(
                  'Deleted Failed !!!',
                  'Item not removed',
                  'error'
              )
            })
        }
      })
    }
  }
}
</script>