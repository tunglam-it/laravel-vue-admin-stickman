<template>
  <ItemPlayerCreate @giveItemForUser="giveItemForUser"/>
</template>

<script>
import ItemPlayerCreate from "../../../components/ItemPlayer/ItemPlayerCreate.vue";
import axiosClient from "../../../axiosClient";
import notifyPopup from "../../../mixins/notifyPopup.js";

export default {
  name: "CreateItemPlayer",
  components: {ItemPlayerCreate},
  mixins:[notifyPopup],
  methods: {
    /**-
     * call api give item for user
     * @param info
     */
    giveItemForUser(info) {
      axiosClient.post('/admin/give-item-for-user', {userId:info.userId.id, itemRawId:info.itemRawId.id})
        .then(() => {
          this.$router.push('/list-item-user')
          this.notifyAPI('success', 'Success !!!')
        })
        .catch(() => {
          this.notifyAPI('error', 'Failed !!!')
        })
    }

  }
}
</script>
