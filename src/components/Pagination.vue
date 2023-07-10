<template>
  <nav>
    <ul class="pagination">
      <li class="page-item me-2">
      <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Previous" v-on:click.prevent="changePage(1)">
<!--        <span aria-hidden="true"><i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i> </span>-->
        <span aria-hidden="true">&lt&lt</span>
      </a>
    </li>
      <li v-if="this.pagination.current_page > 1" class="page-item me-2">
        <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Previous" v-on:click.prevent="changePage(this.pagination.current_page - 1)">
          <span aria-hidden="true">&lt</span>
        </a>
      </li>
      <li v-for="page in pagesNumber" :class="{'active': page === this.pagination.current_page}" class="page-item me-2">
        <a class="page-link page-link-radius" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="this.pagination.current_page < this.pagination.last_page" class="page-item me-2">
        <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Next" v-on:click.prevent="changePage(this.pagination.current_page + 1)">
          <span aria-hidden="true"> > </span>
        </a>
      </li>
      <li class="page-item me-2">
        <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Next" v-on:click.prevent="changePage(this.pagination.last_page)">
          <span aria-hidden="true"> >> </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    pagination:[],
    offset:''
  },
  computed: {
    /***
     * calculate pagenumber
     * @return {*[]}
     */
    pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + (this.offset * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    }
  },
  methods:{
    /***
     * display & change page when click pagenumber
     * @param page
     */
    changePage(page) {
      this.pagination.current_page = page;
      this.$emit('paginate');
    }
  }

}
</script>