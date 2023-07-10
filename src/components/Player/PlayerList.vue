<template>
  <AppHeader />
  <div class="container-fluid">
    <div class="row">
      <AppSidebar />
      <!-- Phần content -->
      <main role="main" class="col-md-10 ml-sm-auto col-lg-10 bg-main p-0">
        <div class="bg-white py-3 mb-3 px-4 text-primary">
          <h6 class="fw-bold">Người chơi</h6>
        </div>
        <div class="px-4">
          <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">Status:</div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="all" class="form-check-input" value=""
                @change="searchInfo">
              <label for="all" class="form-check-label ms-2">All</label>
            </div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="status1" class="form-check-input" value="1"
                @change="searchInfo">
              <label for="status1" class="form-check-label ms-2">Active</label>
            </div>
            <div class="col-auto">
              <input name="status" type="radio" v-model="status" id="status2" class="form-check-input" value="2"
                @change="searchInfo">
              <label for="status2" class="form-check-label ms-2">Unactive</label>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-md-2">Username:</div>
            <div class="col-md-4">Date:</div>
            <div class="col-md-4">Gold:</div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input class="form-control me-2" placeholder="Nhập username" v-model="username" type="text"
                  @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-regular fa-calendar-days"></i></span>
                <input class="form-control me-2" v-model="start_date" type="date" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-regular fa-calendar-days"></i></span>
                <input class="form-control me-2" placeholder="Nhập username để tìm kiếm" v-model="end_date" type="date"
                @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-solid fa-coins"></i></span>
                <input placeholder="Start Gold" class="form-control me-2" v-model="start_gold" type="number" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-solid fa-coins"></i></span>
                <input placeholder="End Gold" class="form-control me-2" v-model="end_gold" type="number" @change="searchInfo">
              </div>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-md-4">Level:</div>
            <div class="col-md-4">Diamonds:</div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold">Lv</span>
                <input placeholder="Start Level" class="form-control me-2" v-model="start_level" type="number" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold">Lv</span>
                <input placeholder="End Level" class="form-control me-2" v-model="end_level" type="number" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-solid fa-gem"></i></span>
                <input placeholder="Start Diamonds" class="form-control me-2" v-model="start_diamonds" type="number" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group mb-3 m-0">
                <span class="input-group-text fw-bold"><i class="fa-solid fa-gem"></i></span>
                <input placeholder="End Diamonds" class="form-control me-2" v-model="end_diamonds" type="number" @change="searchInfo">
              </div>
            </div>
            <div class="col-md-2">
              <button class="btn btn-outline-primary" @click="resetSearch"><i class="fa-solid fa-eraser me-2"></i>Clear</button>
            </div>
            <div class="col-md-2">
              <router-link class="btn btn-success float-end" to="/create-user">+</router-link>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="card mt-2">
                <div class="card-body">
                  <table class="table table-hover table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Level</th>
                        <th scope="col">Gold</th>
                        <th scope="col">Diamonds</th>
                        <th scope="col">Energy</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="9" class="text-center fw-bold" v-if="this.users.data.length < 1">Users Not Found</td>
                      </tr>
                      <tr v-for="user in this.users.data">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.username }}</td>
                        <td>{{ user.level }}</td>
                        <td>{{ user.gold }}</td>
                        <td>{{ user.diamonds }}</td>
                        <td>{{ user.energy }}</td>
                        <td>{{ user.created_at }}</td>
                        <td><button @click="changeStatus(user.id, user.status == 1 ? 2 : 1)" class="btn btn-sm"
                            :class="{ 'btn-danger': user.status == 2, 'btn-success': user.status == 1 }">{{
                              getStatusName(user.status) }}</button></td>
                        <td>
                          <button @click="editUser(user.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            type="button" class="btn btn-sm btn-primary me-2"><i class="fa-regular fa-pen-to-square"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)"><i
                              class="fa-regular fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="d-inline-flex align-items-center mt-2">
                <span class="me-4 fw-bold text-black">Display: {{ this.users.to }} users of Total: {{ this.users.total }}
                  users</span>
                <Pagination :pagination="users" @paginate="searchInfo" :offset="4" />

              </div>
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
          <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel"><i class="fa-solid fa-pencil"></i>
            Edit player</h1>
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
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" @click="approveEditUser(this.user_selected)"
            data-bs-dismiss="modal">
            <i class="fa-solid fa-floppy-disk me-2"></i>Save
          </button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            <i class="fa-solid fa-arrow-left me-2"></i>Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <AppFooter />
</template>

<script>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient";
import notifyPopup from "../../mixins/notifyPopup.js";
import Pagination from "../Pagination.vue";

export default {
  name: 'PlayerList',
  components: { AppSidebar, AppHeader, AppFooter, Pagination },
  mixins: [notifyPopup],
  props: {
    users: {},
  },
  data() {
    return {
      username: '',
      start_date: '',
      end_date: '',
      start_level: '',
      end_level: '',
      start_gold: '',
      end_gold: '',
      start_diamonds: '',
      end_diamonds: '',
      status: '',
      page: '',
      user_selected: {},
    }
  },
  methods: {
    /***
     * call emit searchInfo
     */
    searchInfo() {
      this.$emit('searchInfo',
        this.username,
        this.start_date,
        this.end_date,
        this.start_level,
        this.end_level,
        this.start_gold,
        this.end_gold,
        this.start_diamonds,
        this.end_diamonds,
        this.status,
      )
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
     * get Name of status
     * @param status
     * @return {string}
     */
    getStatusName(status) {
      if (status == 1) {
        return 'Active'
      }
      return "Unactive"
    },

    /***
     * confirm to delete user
     * @param id
     * @return mixed
     */
    deleteUser(id) {
      this.$emit('deleteUser', id)
    },

    /***
     * Change status user by userId
     * @param id
     * @param status
     * @return {Promise<void>}
     */
    changeStatus(id, status) {
      axiosClient.put(`/player/change-status-user/${id}`, { status: status })
        .then(() => {
          this.searchInfo()
          this.notifyAPI('success', 'Success !!!')
        })
        .catch(() => {
          this.notifyAPI('error', "Failed !!!!")
        })
    },

    resetSearch() {
      this.username = ''
      this.start_date = ''
      this.end_date = ''
      this.status = ''
      this.start_level = ''
      this.end_level = ''
      this.start_diamonds = ''
      this.end_diamonds = ''
      this.start_gold = ''
      this.end_gold = ''
      this.searchInfo()
    }
  }
}
</script>