<template>
  <ItemCreate @createItem="createItem" />
</template>

<script>
import ItemCreate from "../../../components/Item/ItemCreate.vue";
import axiosClient from "../../../axiosClient.js";
export default {
  name: "CreateItem",
  components: {ItemCreate},
  methods:{
    createItem(info){
      axiosClient.post('/player/create-item',info)
          .then(res=>{
            this.$router.push('/list-item')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
