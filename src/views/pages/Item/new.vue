<template>
  <ItemCreate @createItem="createItem" />
</template>

<script>
import ItemCreate from "../../../components/Item/ItemCreate.vue";
import axiosClient from "../../../axiosClient.js";
import notifyPopup from "../../../mixins/notifyPopup.js";
export default {
  name: "CreateItem",
  components: {ItemCreate},
  mixins:[notifyPopup],
  methods:{
    createItem(info){
      axiosClient.post('/admin/create-item',info)
        .then(()=>{
          this.$router.push('/list-item')
          this.notifyAPI('success', 'Success !!!!')
      })
      .catch(()=>{
        this.notifyAPI('error', 'Failed !!!!')
      })
    }
  }
}
</script>
