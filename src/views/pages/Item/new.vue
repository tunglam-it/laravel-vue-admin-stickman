<template>
  <ItemCreate @createItem="createItem"/>
</template>

<script setup>
import ItemCreate from "../../../components/Item/ItemCreate.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";
import {useRouter} from "vue-router";

const {notifyAPI} = notifyPopup()
const router = useRouter()
/***
 * create new item
 * @param info
 */
const createItem = (info) => {
  axiosClient.post('/admin/create-item', info)
      .then(() => {
        router.push('/list-item')
        notifyAPI('success', 'Success !!!!')
      })
      .catch(() => {
        notifyAPI('error', 'Failed !!!!')
      })
}
</script>
