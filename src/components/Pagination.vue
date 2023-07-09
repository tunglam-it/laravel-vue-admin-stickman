<template>
  <nav>
    <ul class="pagination">
      <li v-if="this.pagination.current_page > 1" class="page-item">
        <a class="page-link" href="javascript:void(0)" aria-label="Previous" v-on:click.prevent="changePage(this.pagination.current_page - 1)">
          <span aria-hidden="true">«</span>
        </a>
      </li>
      <li v-for="page in pagesNumber" :class="{'active': page === this.pagination.current_page}" class="page-item">
        <a class="page-link" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="this.pagination.current_page < this.pagination.last_page" class="page-item">
        <a class="page-link" href="javascript:void(0)" aria-label="Next" v-on:click.prevent="changePage(this.pagination.current_page + 1)">
          <span aria-hidden="true">»</span>
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