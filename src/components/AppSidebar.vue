<template>
  <nav class="col-md-2 d-none d-md-block bg-main min-vh-100" >
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item ">
          <router-link class="nav-link text-decoration-none hover" to="/">
            <span class="text-white "><i class="fa-solid fa-list me-4"></i>Trang chủ</span>
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