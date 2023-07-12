<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-10 ml-sm-auto col-lg-10 bg-main px-3 py-3">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <Form @submit="createItem">
              <div class="card-header text-primary">
                <i class="fa-solid fa-pencil me-1"></i>
                <span class="fw-bold">Add item</span>
              </div>
              <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Item Name</label>
                      <Field name="name" type="text" v-model="info.name" class="form-control" id="name"
                             placeholder="Item Name" :rules="validateInput"/>
                      <ErrorMessage name="name" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Max Level</label>
                      <Field name="max_level" type="number" v-model="info.max_level" class="form-control" id="max_level"
                             placeholder="Max Level" :rules="validateInput"/>
                      <ErrorMessage name="max_level" class="danger text-danger"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Types</label>
                      <Field as="select" name="type" v-model="info.type" class="form-control" id="password"
                             :rules="validateInput">
                        <option v-for="type in getTypes()" :value="type.id">{{ type.name }}</option>
                      </Field>
                      <ErrorMessage name="type" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Rarity</label>
                      <Field as="select" name="rarity" v-model="info.rarity" class="form-control" id="rarity"
                             :rules="validateInput">
                        <option v-for="rare in getRarity()" :value="rare.id">{{ rare.name }}</option>
                      </Field>
                      <ErrorMessage name="rarity" class="danger text-danger"/>
                    </div>
                  </div>
                  <div class="row">

                    <div class="mb-3 col-md-3">
                      <label class="form-label">ATK</label>
                      <Field name="atk" type="number" v-model="info.atk"
                             class="form-control" id="atk" placeholder="ATK"
                             />
                      <ErrorMessage name="atk" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-3">
                      <label class="form-label">Body Def</label>
                      <Field name="body_def" type="number"
                             v-model="info.body_def" class="form-control" id="body_def"
                             placeholder="Body Def" />
                      <ErrorMessage name="body_def" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-3">
                      <label class="form-label">Head Def</label>
                      <Field name="head_def" type="number"
                             v-model="info.head_def" class="form-control" id="head_def"
                             placeholder="Head Def" />
                      <ErrorMessage name="head_def" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-3">
                      <label class="form-label">HP</label>
                      <Field name="hp" type="number" v-model="info.hp"
                             class="form-control" id="hp" placeholder="HP"
                             />
                      <ErrorMessage name="hp" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-3">
                      <label class="form-label">Stat Increment</label>
                      <Field name="stat_increment" type="number" v-model="info.stat_increment" class="form-control"
                             id="stat_increment" placeholder="Stat Increment" :rules="validateInput"/>
                      <ErrorMessage name="stat_increment" class="danger text-danger"/>
                    </div>
                    <div class="mb-3 col-md-3">
                      <label class="form-label">Price Increment</label>
                      <Field name="price_increment" type="number" v-model="info.price_increment" class="form-control"
                             id="price_increment" placeholder="Price Increment" :rules="validateInput"/>
                      <ErrorMessage name="price_increment" class="danger text-danger"/>
                    </div>
                  </div>
              </div>
              <div class="card-footer text-center">
                <button type="submit" class="btn btn-primary me-2"><i class="fa-solid fa-floppy-disk me-2"></i>Save</button>
                <button class="btn btn-outline-primary me-2"><i class="fa-solid fa-arrow-left me-2"></i>Cancel</button>
              </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <AppFooter/>
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import validateMixin from "../../mixins/validateMixin.js";
import getAttributeName from "../../mixins/getAttributeName.js";
import {Field, Form, ErrorMessage} from 'vee-validate';
import types from "../../attributes/TypeItem.js";
import rarity from "../../attributes/RarityItem.js";
import {reactive} from "vue";

const emit = defineEmits(['createItem'])
const {validateInput} = validateMixin()
const {getTypes, getTypeName, getRarity, getRarityName} = getAttributeName()
const info = reactive({
  name: '',
  type: '',
  atk: '',
  head_def: '',
  body_def: '',
  hp: '',
  rarity: '',
  stat_increment: '',
  price_increment: '',
  max_level: '',
})
const state = reactive({
  types: types,
  rarity: rarity,
})

/***
 * call emit to register player
 */
const createItem=()=> {
  emit('createItem', info)
}
</script>
