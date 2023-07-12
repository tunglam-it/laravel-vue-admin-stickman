<template>
  <ItemPlayerCreate @giveItemForUser="giveItemForUser" />
</template>

<script setup>
import ItemPlayerCreate from "../../../components/ItemPlayer/ItemPlayerCreate.vue";
import axiosClient from "../../../axiosClient";
import notifyPopup from "../../../mixins/notifyPopup.js";
import {useRouter} from "vue-router";

const {notifyAPI} = notifyPopup()
const router = useRouter()
/**
 * call api give item for user
 * @param info
 */
const giveItemForUser = (info) => {
  axiosClient.post('/admin/give-item-for-user', {userId: info.userId.id, itemRawId: info.itemRawId.id})
    .then(() => {
      router.push('/list-item-user')
      notifyAPI('success', 'Success !!!')
    })
    .catch(() => {
      notifyAPI('error', 'Failed !!!')
    })
}
</script>
