<template>
  <header class="text-light py-3 bg-white" style="border-bottom: 1px solid rgba(0,0,0,0.09)">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <img src="../assets/img.png" alt="Logo" class="img-style ms-2">
          <span class="text-black ms-3 fs-01">Stickman Manager</span>
        </div>
        <div class="col-md-10 d-flex justify-content-end align-items-center">
          <div class="dropdown">
            <div class="dropdown-toggle text-black" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Xin chào, Admin
              <img src="https://picsum.photos/30" style="border-radius: 50%">
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><router-link class="dropdown-item text-black" @click="logout" to="#">Đăng xuất</router-link></li>
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