<template>
  <PlayerCreate @registerNewPlayer="registerNewPlayer"/>
</template>

<script>
import PlayerCreate from "../../../components/Player/PlayerCreate.vue";
import axiosClient from "../../../axiosClient.js";

export default {
  name: "CreateUser",
  components: {PlayerCreate},
  methods: {
    /***
     * register a new player
     * @param info
     * @return mixed
     */
    registerNewPlayer(info) {
      axiosClient.post('/player/register', info)
          .then(res => {
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>
