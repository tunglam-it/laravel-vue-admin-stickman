<template>
  <ItemPlayerList @searchItemPlayer="searchItemPlayer" :items="items" @deleteItemUser="deleteItemUser"/>
</template>

<script>
import ItemPlayerList from "../../../components/ItemPlayer/ItemPlayerList.vue";
import axiosClient from "../../../axiosClient.js";

export default {
  name: "ListItemPlayer",
  components: {ItemPlayerList},
  data() {
    return {
      items: {}
    }
  },
  created() {
    this.searchItemPlayer()
  },
  methods: {

    /***
     * get all item of user
     */
    searchItemPlayer(playerName = '', itemName = '') {
      axiosClient.get(`/player/get-all-item-users?page=${this.items.current_page}&playerName=${playerName}&itemName=${itemName}`)
          .then(({data}) => {
            this.items = data.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    /***
     * delete item of user by itemUserId
     * @param id
     * @return mixed
     */
    deleteItemUser(id) {
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
          axiosClient.delete(`/admin/delete-item-user/${id}`)
            .then(() => {
              this.searchItemPlayer()
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