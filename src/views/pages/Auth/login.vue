<template>
  <AuthHeader />
  <main class="container my-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <Form @submit="handleLogin">
          <h2 class="mb-4 text-center">Đăng nhập</h2>
          <div class="mb-3">
            <Field v-model="username" type="text" class="form-control" name="username" placeholder="Username" :rules="validateInput" />
            <ErrorMessage name="username" class="danger text-danger" />
          </div>
          <div class="mb-3">
            <Field v-model="password" type="password" class="form-control" name="password" placeholder="Password" :rules="validateInput" />
            <ErrorMessage name="password" class="danger text-danger" />
          </div>
          <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </Form>
      </div>
    </div>
  </main>

  <AppFooter />
</template>

<script>
import AuthHeader from '../../../components/Auth/AuthHeader.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import axiosClient from "../../../axiosClient.js";
import validateMixin from "../../../mixins/validateMixin.js"
import AppFooter from "../../../components/AppFooter.vue"

export default {
  mixins: [validateMixin],
  name: 'Login',
  components: { Field, Form, ErrorMessage, AuthHeader, AppFooter },
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    /**
     * Login
     */
    async handleLogin() {
      await axiosClient.post("/admin/login", {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/");
          window.location.reload()
        })
        .catch((error) => {
          this.$swal.fire({
            title: 'Lỗi!',
            text: error.response.data.error,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
    }
  }
}
</script>
