<template>
  <PlayerCreate @registerNewPlayer="registerNewPlayer"/>
</template>

<script setup>
import PlayerCreate from "../../../components/Player/PlayerCreate.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";
import {useRouter} from "vue-router";

const {notifyAPI} = notifyPopup()
const router = useRouter()
/***
 * register a new player
 * @param info
 * @return mixed
 */
const registerNewPlayer = (info) => {
  axiosClient.post('/player/register', info)
      .then(() => {
        router.push('/')
        notifyAPI('success', "Success !!!")
      })
      .catch(() => {
        notifyAPI('error', "Failed !!!")
      })
}
</script>
