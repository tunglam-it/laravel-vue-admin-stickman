<template>
  <AppHeader/>
  <div class="container-fluid">
    <div class="row">
      <AppSidebar/>
      <!-- Phần content -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
            class=" d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h4 class="fw-bold">Thông tin tài khoản người chơi</h4>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <div class="col-md-4 mb-2">
                  <input class="form-control me-2" placeholder="Nhập username để tìm kiếm" v-model="username"
                         type="text" @change="searchUsername">
                </div>
              </div>
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Level</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td colspan="5" v-if="this.users.length<1">Users Not Found</td>
                  </tr>
                  <tr v-for="user in this.users">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.created_at }}</td>
                    <td>{{ user.level }}</td>
                    <td>
                      <button @click="editUser(user.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              type="button" class="btn btn-sm btn-primary me-4"><i
                          class="fa-regular fa-pen-to-square me-3"></i>Edit
                      </button>
                      <button class="btn btn-sm btn-danger" @click="confirmDelete(user.id)"><i
                          class="fa-regular fa-trash-can me-3"></i>Delete
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="d-inline-flex align-items-center">
              <span class="me-4 fw-bold text-white">Total: {{ this.users.length }} users</span>
              <nav class="mt-2">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angles-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-chevron-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-chevron-right"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angles-right"></i></a></li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin người chơi</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Username:</label>
              <input v-model="this.user_selected.username" type="text" class="form-control" disabled>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="gold" class="col-form-label">Gold:</label>
                <input v-model="this.user_selected.gold" type="text" class="form-control" id="gold">
              </div>
              <div class="mb-3 col-md-6">
                <label for="diamonds" class="col-form-label">Diamonds:</label>
                <input v-model="this.user_selected.diamonds" type="text" class="form-control" id="diamonds">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="exp-profile" class="col-form-label">Exp:</label>
                <input v-model="this.user_selected.exp_profile" type="text" class="form-control" id="exp-profile">
              </div>
              <div class="mb-3 col-md-6">
                <label for="energy" class="col-form-label">Energy:</label>
                <input v-model="this.user_selected.energy" type="text" class="form-control" id="energy">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="approveEditUser(this.user_selected)" data-bs-dismiss="modal">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <AppFooter/>
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient";

export default {
  name: 'AdminList',
  components: {AppSidebar, AppHeader, AppFooter},
  props: {
    users: {},
  },
  data() {
    return {
      username: '',
      user_selected: {},
    }
  },
  methods: {
    /***
     * call emit searchUsername
     */
    searchUsername() {
      this.$emit('searchUsername', this.username)
    },

    /***
     * call api to get full info user
     * @param user_id
     * @return mixed
     */
    editUser(user_id) {
      axiosClient.get(`/admin/get-user-info/${user_id}`)
          .then(res => {
            this.user_selected = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    /***
     * call emit to update user attributes
     */
    approveEditUser(user_selected) {
      this.$emit('approveEditUser', user_selected)
    },

    /***
     * confirm to delete user
     * @param id
     * @return mixed
     */
    confirmDelete(id){
      this.$emit('confirmDelete', id)
    }
  }
}
</script>