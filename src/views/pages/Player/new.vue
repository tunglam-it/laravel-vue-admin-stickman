<template>
  <PlayerCreate @registerNewPlayer="registerNewPlayer"/>
</template>

<script>
import PlayerCreate from "../../../components/Player/PlayerCreate.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";

export default {
  name: "CreatePlayer",
  components: {PlayerCreate},
  mixins:[notifyPopup],
  methods: {
    /***
     * register a new player
     * @param info
     * @return mixed
     */
    registerNewPlayer(info) {
      axiosClient.post('/player/register', info)
          .then(() => {
            this.$router.push('/')
            this.notifyAPI('success', "Success !!!")
          })
          .catch(() => {
            this.notifyAPI('error', "Failed !!!")
          })
    }
  }
}
</script>
