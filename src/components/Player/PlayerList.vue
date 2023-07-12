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
        <div class="px-4 pb-2">
          <i class="fa-solid fa-chevron-down me-2 text-primary"></i>
          <span class="fw-bold">Search Criteria</span>
        </div>
        <div class="px-4">

          <PlayerSearch @searchInfo="searchInfo" />

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
                        <td colspan="9" class="text-center fw-bold" v-if="props.users.data.length < 1">Users Not Found
                        </td>
                      </tr>
                      <tr v-for="user in props.users.data">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.username }}</td>
                        <td>{{ user.level }}</td>
                        <td>{{ user.gold }}</td>
                        <td>{{ user.diamonds }}</td>
                        <td>{{ user.energy }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>
                          <button @click="changeStatus(user.id, user.status == 1 ? 2 : 1)" class="btn btn-sm"
                            :class="{ 'btn-danger': user.status == 2, 'btn-success': user.status == 1 }">{{
                              getStatusName(user.status)
                            }}
                          </button>
                        </td>
                        <td>
                          <div class="btn-group">
                            <button @click="editUser(user.id)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              type="button" class="btn btn-sm btn-primary"><i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)"><i
                                class="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Pagination :pagination="users" @paginate="searchInfo" :offset="4" />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <PlayerEdit :user_selected="user_selected" @approveEditUser="approveEditUser" />

  <AppFooter />
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
import AppHeader from "../AppHeader.vue";
import AppSidebar from "../AppSidebar.vue";
import axiosClient from "../../axiosClient";
import notifyPopup from "../../mixins/notifyPopup.js";
import Pagination from "../Pagination.vue";
import { ref } from 'vue'
import PlayerSearch from "./PlayerSearch.vue";
import PlayerEdit from "./PlayerEdit.vue";

const { notifyAPI } = notifyPopup()
const props = defineProps({
  users: Object
})

const user_selected = ref('')

const emit = defineEmits(['approveEditUser', 'deleteUser', 'searchInfo'])
/***
 * call emit searchInfo
 */
const searchInfo = (username, start_date, end_date, start_level, end_level, start_gold, end_gold, start_diamonds, end_diamonds, status) => {
  emit('searchInfo', username, start_date, end_date, start_level, end_level, start_gold, end_gold, start_diamonds, end_diamonds, status,)
}

/***
 * call api to get full info user
 * @param user_id
 * @return mixed
 */
const editUser = (user_id) => {
  axiosClient.get(`/admin/get-user-info/${user_id}`)
    .then(res => {
      user_selected.value = res.data

    })
    .catch(err => {
      console.log(err)
    })
}

/***
 * call emit to update user attributes
 */
const approveEditUser = (user_selected) => {
  emit('approveEditUser', user_selected)
}

/***
 * get Name of status
 * @param status
 * @return {string}
 */
const getStatusName = (status) => {
  if (status == 1) {
    return 'Active'
  }
  return "Unactive"
}

/***
 * confirm to delete user
 * @param id
 * @return mixed
 */
const deleteUser = (id) => {
  emit('deleteUser', id)
}

/***
 * Change status user by userId
 * @param id
 * @param status
 * @return {Promise<void>}
 */
const changeStatus = (id, status) => {
  axiosClient.put(`/player/change-status-user/${id}`, { status: status })
    .then(() => {
      searchInfo()
      notifyAPI('success', 'Success !!!')
    })
    .catch(() => {
      notifyAPI('error', "Failed !!!!")
    })
}


</script>