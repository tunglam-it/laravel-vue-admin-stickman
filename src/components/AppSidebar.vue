<template>
  <nav class="col-md-2 d-none d-md-block bg-light min-vh-100" >
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item py-3">
          <router-link class="nav-link text-decoration-none hover " to="/">
            <span class="text-black"><i class="fa-solid fa-users me-4"></i>Người chơi</span>
          </router-link>
        </li>
        <li class="nav-item py-3">
          <router-link class="nav-link text-decoration-none hover" to="/list-item">
            <span class="text-black text-hover"><i class="fa-solid fa-shirt me-4"></i>Items</span>
          </router-link>
        </li>
        <li class="nav-item py-3">
          <router-link class="nav-link text-decoration-none hover" to="/list-item-user">
            <span class="text-black "><i class="fa-solid fa-user-tie me-4"></i>Items Player</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppSidebar"
}
</script>