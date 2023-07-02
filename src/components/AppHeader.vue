<template>
  <header class="text-light py-3 bg-main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 text-center">
          <img src="../assets/img.png" alt="Logo" class="img-style">
          <span class="text-white ms-3 fs-01">Stickman Manager</span>
        </div>
        <div class="col-md-10 d-flex justify-content-end align-items-center">
          <div class="dropdown">
            <div class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Xin chào, Admin
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><router-link class="dropdown-item" @click="logout" to="#">Đăng xuất</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
 
<script>
export default {
  name: 'AppHeader',
  methods: {
    /**
     * logout
     */
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      window.location.reload()
    },

  }
}
</script>