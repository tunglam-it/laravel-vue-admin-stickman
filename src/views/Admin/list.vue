<template>
  <AdminList :users="users" @searchUsername="getAllUser" @approveEditUser="approveEditUser" @confirmDelete="confirmDelete"/>
</template>

<script>
import AdminList from '../../components/Admin/AdminList.vue'
import axiosClient from "../../axiosClient.js";

export default {
  name: 'List',
  components: {AdminList},
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
    getAllUser(username='') {
      axiosClient.get(`/admin/get-all-users?username=${username}`).then(res => {
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
    approveEditUser(user_selected) {
      axiosClient.put(`/admin/update-user/${user_selected.id}`,user_selected)
          .then(res=>{
            this.getAllUser()
          })
          .catch(err=>{
            console.log(err)
          })
    },

    /***
     * confirm to delete user
     * @param id
     * @return mixed
     */
    confirmDelete(id){
      if (confirm('Are you sure delete this user?')){
        this.deleteUser(id)
      }
    },

    /***
     * delete user by id
     * @param id
     * @return mixed
     */
    deleteUser(id){
      axiosClient.delete(`/admin/delete-user/${id}`)
      .then(res=>{
        this.getAllUser()
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>