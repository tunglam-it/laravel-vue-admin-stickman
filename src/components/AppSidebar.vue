<template>
  <nav class="col-md-2 bg-white min-vh-100 p-0 border-right">
    <div class="sidebar-sticky">
      <ul class=" list-group">
        <li class="py-3 hover list-group-item border-radius-none">
          <router-link class="nav-link text-decoration-none" to="/">
            <span class="text-black text-white-hover"><i class="fa-solid fa-home me-4"></i>Home</span>
          </router-link>
        </li>
        <li class="py-3 hover list-group-item border-radius-none" :class="{'active': this.currentLink==='list-user'}">
          <router-link class="nav-link text-decoration-none hover " to="/">
            <span class="text-black text-white-hover" :class="{'text-white': this.currentLink==='list-user'}"><i class="fa-solid fa-users me-4"></i>Người chơi</span>
          </router-link>
        </li>
        <li class="py-3 hover list-group-item border-radius-none" :class="{active: this.currentLink==='list-item'}">
          <router-link class="nav-link text-decoration-none hover" to="/list-item">
            <span class="text-black text-white-hover" :class="{'text-white': this.currentLink==='list-item'}"><i class="fa-solid fa-shirt me-4"></i>Items</span>
          </router-link>
        </li>
        <li class="py-3 hover list-group-item border-radius-none" :class="{active: this.currentLink==='list-item-user'}">
          <router-link class="nav-link text-decoration-none hover" to="/list-item-user">
            <span class="text-black text-white-hover" :class="{'text-white': this.currentLink==='list-item-user'}"><i class="fa-solid fa-user-tie me-4"></i>Items Player</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      currentLink: ''
    }
  },
  created() {
    this.currentLink = this.$route.name
    this.$router.afterEach((to, from) => {
      this.currentLink = to.name
    })
  }
}
</script>