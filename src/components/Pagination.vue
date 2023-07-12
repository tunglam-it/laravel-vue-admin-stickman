<template>
  <div class="d-inline-flex align-items-center mt-2">
    <span class="me-4 fw-bold text-black">Display: {{ props.pagination.to }} items of Total: {{ props.pagination.total }}
      items</span>
    <nav>
      <ul class="pagination">
        <li class="page-item me-2">
          <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Previous"
            v-on:click.prevent="changePage(1)">
            <span aria-hidden="true">&lt&lt</span>
          </a>
        </li>
        <li v-if="props.pagination.current_page > 1" class="page-item me-2">
          <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Previous"
            v-on:click.prevent="changePage(props.pagination.current_page - 1)">
            <span aria-hidden="true">&lt</span>
          </a>
        </li>
        <li v-for="page in pagesNumber" :class="{ 'active': page === props.pagination.current_page }"
          class="page-item me-2">
          <a class="page-link page-link-radius" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page
          }}</a>
        </li>
        <li v-if="props.pagination.current_page < props.pagination.last_page" class="page-item me-2">
          <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Next"
            v-on:click.prevent="changePage(props.pagination.current_page + 1)">
            <span aria-hidden="true"> > </span>
          </a>
        </li>
        <li class="page-item me-2">
          <a class="page-link page-link-radius" href="javascript:void(0)" aria-label="Next"
            v-on:click.prevent="changePage(props.pagination.last_page)">
            <span aria-hidden="true"> >> </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(['paginate'])
const props = defineProps({
  pagination: Object,
  offset: Number
})

const pagesNumber = computed(() => {
  if (!props.pagination.to) {
    return [];
  }
  let from = props.pagination.current_page - props.offset;
  if (from < 1) {
    from = 1;
  }
  let to = from + (props.offset * 2);
  if (to >= props.pagination.last_page) {
    to = props.pagination.last_page;
  }
  let pagesArray = [];
  for (let page = from; page <= to; page++) {
    pagesArray.push(page);
  }
  return pagesArray;
})

/***
 * display & change page when click pagenumber
 * @param page
 */
const changePage = (page) => {
  props.pagination.current_page = page;
  emit('paginate');
}
</script>