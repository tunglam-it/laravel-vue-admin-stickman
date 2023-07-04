<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
            class=" d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h4 class="fw-bold">Thêm mới tài khoản người chơi</h4>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <Form @submit="registerNewPlayer">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <Field name="username" type="text" v-model="info.username" class="form-control" id="username" placeholder="Username" :rules="validateInput" />
                    <ErrorMessage name="username" class="danger text-danger" />
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="password" class="form-label">Password</label>
                      <Field name="password" type="password" v-model="info.password" class="form-control" id="password" placeholder="Password" :rules="validateInput" />
                      <ErrorMessage name="password" class="danger text-danger" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="password_confirmation" class="form-label">Confirm Password</label>
                      <Field name="password_confirmation" type="password" v-model="info.password_confirmation" class="form-control" id="password_confirmation" placeholder="Confirm Password" :rules="validateInput" />
                      <ErrorMessage name="password_confirmation" class="danger text-danger" />
                      <div class="text-danger" v-if="passwordMatchError">Password must match</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-3">
                      <label for="gold" class="form-label">Gold</label>
                      <input type="number" v-model="info.gold" class="form-control" id="gold" placeholder="Gold">
                    </div>
                    <div class="mb-3 col-md-3">
                      <label for="diamonds" class="form-label">Diamonds</label>
                      <input type="number" v-model="info.diamonds" class="form-control" id="diamonds" placeholder="Diamonds">
                    </div>
                    <div class="mb-3 col-md-3">
                      <label for="energy" class="form-label">Energy</label>
                      <input type="number" v-model="info.energy" class="form-control" id="energy" placeholder="Energy">
                    </div>
                    <div class="mb-3 col-md-3">
                      <label for="exp" class="form-label">EXP</label>
                      <input type="number" v-model="info.exp" class="form-control" id="exp" placeholder="EXP">
                    </div>
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
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  components: {AppSidebar, AppHeader, AppFooter, Field, Form, ErrorMessage},
  mixins:[validateMixin],
  data(){
    return{
      info:{
        username:'',
        password:'',
        password_confirmation:'',
        gold:'',
        diamonds:'',
        energy:'',
        exp:''
      }
    }
  },
  methods:{
    /***
     * call emit to register player
     */
    registerNewPlayer(){
      this.$emit('registerNewPlayer', this.info)
    }
  }
}
</script>