<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div class=" d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h4 class="fw-bold">Thêm mới Item cho User</h4>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <Form @submit="giveItemForUser">
                  <div class="mb-3">
                    <label class="form-label">Item</label>
                    <VueMultiselect
                        v-model="info.itemRawId"
                        :options="this.itemOptions"
                        :custom-label="nameWithTypeAndRarity"
                        placeholder="Select one"
                        label="name"
                        track-by="id">
                    </VueMultiselect>
                    <label class="danger text-danger" v-show="isInvalid">Both Field is required</label>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Player</label>
                    <VueMultiselect
                        name="item"
                        v-model="info.userId"
                        :options="playerOptions"
                        :custom-label="nameWithLevel"
                        placeholder="Select one"
                        label="name"
                        track-by="id">
                    </VueMultiselect>
                    <label class="danger text-danger" v-show="isInvalid">Both Field is required</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <AppFooter/>
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import validateMixin from "../../mixins/validateMixin.js";
import getAttributeName from "../../mixins/getAttributeName.js";
import axiosClient from "../../axiosClient.js";
import {Field, Form, ErrorMessage} from 'vee-validate';
import VueMultiselect from 'vue-multiselect'


export default {
  components: {AppSidebar, AppHeader, AppFooter, Field, Form, ErrorMessage, VueMultiselect},
  mixins: [validateMixin, getAttributeName],
  name: "ItemPlayerCreate",
  data(){
    return{
      itemOptions:[],
      playerOptions:[],
      info:{
        itemRawId:null,
        userId:null
      }
    }
  },
  computed: {
    isInvalid () {
      return !this.info.itemRawId || !this.info.userId ;
    }
  },
  created() {
    this.getAllItems()
    this.getAllUser()
  },
  methods:{
    /***
     * get all items
     */
    getAllItems(){
      axiosClient.get('/player/get-all-item-info')
        .then(({data})=>{
          for (let i = 0; i < data.data.length; i++) {
            let item = {
              id: data.data[i].id,
              name: data.data[i].name,
              rarity: this.getRarityName(data.data[i].rarity),
              type: this.getTypeName(data.data[i].type)
            }
            this.itemOptions.push(item)
          }
        })
    },
    /***
     * multiselect items
     * @param name
     * @param type
     * @param rarity
     * @return {string}
     */
    nameWithTypeAndRarity({ name, type, rarity }) {
      return `Name: ${name} - Type: ${type} - Rarity: ${rarity}`
    },

    /***
     * get all users except admin
     */
    getAllUser(){
      axiosClient.get('/admin/get-all-users')
      .then(({data})=>{
        for (let i = 0; i < data.data.length; i++) {
          let player = {
            id: data.data[i].id,
            name: data.data[i].username,
            level: data.data[i].level
          }
          this.playerOptions.push(player)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },

    /***
     * multiselect players
     * @param name
     * @param level
     * @return {string}
     */
    nameWithLevel({ name, level }) {
      return `Username: ${name} - Level: ${level}`
    },

    /***
     * call emit to giveItemForUser
     */
    giveItemForUser(){
      this.$emit('giveItemForUser', this.info)
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>


